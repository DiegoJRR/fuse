export const getNewSessionId = async (): Promise<string> => {
const response = await fetch("https://fuse-production.up.railway.app/session", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
});

if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}

const data = await response.json();
return data.session_id;
};
