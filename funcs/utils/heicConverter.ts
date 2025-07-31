import toast from "react-hot-toast";

export async function convertHeicToJpeg(
    file: File,
    t: (key: string) => string
): Promise<File | null> {
    if (typeof window === "undefined") {
        return null;
    }

    const heic2any = (await import("heic2any")).default;

    const isHeic =
        file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic");

    if (!isHeic) return file;

    try {
        const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.8,
        });

        const jpegFile = new File(
            [convertedBlob as BlobPart],
            file.name.replace(/\.heic$/i, ".jpg"),
            { type: "image/jpeg" }
        );

        toast.success(t("auth.heicConverted"));
        return jpegFile;
    } catch (error) {
        toast.error(t("auth.heicConversionFailed"));
        return null;
    }
}
