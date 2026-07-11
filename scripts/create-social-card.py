#!/usr/bin/env python3
"""Build the default Emojiency social card from the transparent site logo."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/images/splash/emojiency-splash.png"
DESTINATION = ROOT / "public/images/social/emojiency-card.png"
CARD_SIZE = (1200, 630)
BACKGROUND = "#909090"
LOGO_BOUNDS = (1080, 500)


def main() -> None:
    logo = Image.open(SOURCE).convert("RGBA")
    logo.thumbnail(LOGO_BOUNDS, Image.Resampling.LANCZOS)

    card = Image.new("RGBA", CARD_SIZE, BACKGROUND)
    position = (
        (CARD_SIZE[0] - logo.width) // 2,
        (CARD_SIZE[1] - logo.height) // 2,
    )
    card.alpha_composite(logo, position)

    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    card.convert("RGB").save(DESTINATION, optimize=True)


if __name__ == "__main__":
    main()
