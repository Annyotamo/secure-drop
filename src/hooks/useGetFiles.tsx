export async function useGetFiles(accessToken: string) {
    try {
        const response = await fetch("https://vib7rvzf3a.execute-api.ap-south-1.amazonaws.com/dev/upload", {
            method: "GET",
            headers: {
                "Auth-Token": `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return { message: "Error retrieving files" };
    }
}
