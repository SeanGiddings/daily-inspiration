// utils/api.ts
export async function getQuote() {
  try {
    // Generate a random key between 1 and 999999
    const randomKey = Math.floor(Math.random() * 999999) + 1;

    const baseUrl = "https://api.forismatic.com/api/1.0/";
    const params = new URLSearchParams({
      method: "getQuote",
      key: randomKey.toString(),
      format: "json",
      lang: "en",
    });

    const response = await fetch(
      "https://api.allorigins.win/get?url=" +
        encodeURIComponent(`${baseUrl}?${params.toString()}`)
    );

    const data = await response.json();
    const quote = JSON.parse(data.contents);

    return {
      text: quote.quoteText.trim(),
      author: quote.quoteAuthor.trim() || "Unknown",
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return {
      text: "The best preparation for tomorrow is doing your best today.",
      author: "H. Jackson Brown Jr.",
    };
  }
}
