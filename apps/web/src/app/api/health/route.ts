export async function GET() {
  return Response.json({
    status: "ok",
    service: "ds-pa-web",
    timestamp: new Date().toISOString(),
  });
}
