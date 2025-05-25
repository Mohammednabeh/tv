export default {
  async fetch(request, env, ctx) {
    const m3uUrl = "https://pastebin.com/raw/abc123xyzhttps://h5n.co:80/get.php?username=Mnabih22&password=2222aA2222&type=m3u_plus&output=ts"; // <-- ضع هنا رابط ملف الـ M3U

    try {
      const res = await fetch(m3uUrl);
      const m3u = await res.text();

      const lines = m3u.split("\n");
      let json = [];

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("#EXTINF")) {
          const name = lines[i].split(",")[1];
          const url = lines[i + 1];
          json.push({
            "title": name,
            "streamUrl": url,
            "icon": "https://i.imgur.com/QjY4v0I.png"
          });
        }
      }

      return new Response(JSON.stringify({
        "type": "video",
        "title": "IPTV Playlist",
        "entries": json
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });

    } catch (err) {
      return new Response("Error loading playlist: " + err.message, { status: 500 });
    }
  }
}
