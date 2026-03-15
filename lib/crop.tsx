export const cropIcons: Record<string, string> = {
    corn: "🌽",
    tomato: "🍅",
    carrot: "🥕",
    potato: "🥔",
    wheat: "🌾",
    rice: "🌾",
    lettuce: "🥬",
    cabbage: "🥬",
    onion: "🧅",
    garlic: "🧄",
    chili: "🌶️",
    pepper: "🫑",
    eggplant: "🍆",
    cucumber: "🥒",
    pumpkin: "🎃",
    melon: "🍈",
    banana: "🍌",
    apple: "🍎",
    mango: "🥭",
    pineapple: "🍍",
    coconut: "🥥",
    avocado: "🥑",
}

export function getCropIcon(seenStr: string): string | undefined {
    return cropIcons[seenStr.toLowerCase()]
}