// api/site.js
export default async function handler(req, res) {
  try {
    const target = req.query.url;

    if (!target) {
      return res.status(400).json({ error: "url parametresi gerekli" });
    }

    const response = await fetch(target, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        host: undefined,
      },
    });

    const html = await response.text();

    // Dosya olarak indirme ayarı
    res.setHeader("Content-Disposition", "attachment; filename=index.html.txt");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.status(response.status).send(html);

  } catch (err) {
    res.status(500).json({ error: "Hata oluştu", detail: err.message });
  }
}
