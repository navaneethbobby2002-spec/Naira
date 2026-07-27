export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: "naira-backend",
    message: "NAIRA backend is alive"
  });
}
