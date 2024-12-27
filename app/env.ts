const { PARTYKIT_HOST } = process.env;
if (!PARTYKIT_HOST) {
  throw new Error("Missing PARTYKIT_HOST");
}

export const PartyKitHost = PARTYKIT_HOST;

export const PARTYKIT_PROTOCOL =
  PartyKitHost?.startsWith("localhost") || PartyKitHost?.startsWith("127.0.0.1")
    ? "http"
    : "https";

export const PartyKitUrl = `${PARTYKIT_PROTOCOL}://${PartyKitHost}`;
