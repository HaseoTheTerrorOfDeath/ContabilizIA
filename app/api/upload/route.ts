import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import { promisify } from "util";

export const dynamic = "force-dynamic"; // 👈 Novo padrão exigido pelo Next.js

export async function POST(req: NextRequest) {
  const form = formidable({ multiples: true, uploadDir: "/tmp", keepExtensions: true });
  const parseForm = promisify(form.parse);

  const buffer = await req.arrayBuffer();
  const fileData = Buffer.from(buffer);

  try {
    // Simula o salvamento do arquivo
    const filePath = "/tmp/uploaded_file";
    fs.writeFileSync(filePath, fileData);

    return NextResponse.json({ success: true, path: filePath });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

