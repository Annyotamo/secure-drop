export async function useFileUpload(file: File, fileName: string, fileType: string, accessToken: string | null) {
    try {
        if (!accessToken) throw new Error("No access token provided");

        // Read the file content as base64
        const fileContent = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve((reader.result as string).split(",")[1]); // Remove data URL prefix
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        const fileData = {
            fileContent: fileContent, // Now this is a base64 string
            fileName: fileName,
            fileType: fileType,
        };

        const res = await fetch("https://vib7rvzf3a.execute-api.ap-south-1.amazonaws.com/dev/upload", {
            method: "POST",
            headers: {
                "Auth-Token": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fileData),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Upload error:", err);
        return { error: "Error uploading file" };
    }
}
