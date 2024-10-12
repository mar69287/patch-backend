const games = [
  {
    "name": "Age of Empires 4",
    "slug": "age-of-empires-4"
  },
  {
    "name": "Age of Empires II: Definitive Edition",
    "slug": "age-of-empires-ii-definitive-edition"
  },
  {
    "name": "Among Us",
    "slug": "among-us"
  },
  {
    "name": "Brawlhalla",
    "slug": "brawlhalla"
  },
  {
    "name": "Black Desert Online",
    "slug": "black-desert-online"
  },
  {
    "name": "Call of Duty + Warzone",
    "slug": "call-of-duty-warzone"
  },
  {
    "name": "Cities: Skylines II",
    "slug": "cities-skylines-ii"
  },
  {
    "name": "7 Days to Die",
    "slug": "7-days-to-die"
  },
  {
    "name": "BattleBit Remastered",
    "slug": "battlebit-remastered"
  },
  {
    "name": "Battlefield 2042",
    "slug": "battlefield-2042"
  },
  {
    "name": "Astroneer",
    "slug": "astroneer"
  },
  {
    "name": "Albion Online",
    "slug": "albion-online"
  },
  {
    "name": "Company of Heroes 3",
    "slug": "company-of-heroes-3"
  },
  {
    "name": "Back 4 Blood",
    "slug": "back-4-blood"
  },
  {
    "name": "Borderlands 3",
    "slug": "borderlands-3"
  },
  {
    "name": "Apex Legends",
    "slug": "apex-legends"
  },
  {
    "name": "ARK: Survival Evolved",
    "slug": "ark-survival-evolved"
  },
  {
    "name": "BeamNG.drive",
    "slug": "beamngdrive"
  },
  {
    "name": "Counter-Strike 2",
    "slug": "counter-strike-2"
  },
  {
    "name": "Dark and Darker",
    "slug": "dark-and-darker"
  },
  {
    "name": "DayZ",
    "slug": "dayz"
  },
  {
    "name": "Deadlock",
    "slug": "deadlock"
  },
  {
    "name": "Core Keeper",
    "slug": "core-keeper"
  },
  {
    "name": "Dauntless",
    "slug": "dauntless"
  },
  {
    "name": "Conan Exiles",
    "slug": "conan-exiles"
  },
  {
    "name": "Cyberpunk 2077",
    "slug": "cyberpunk-2077"
  },
  {
    "name": "Baldur's Gate 3",
    "slug": "baldurs-gate-3"
  },
  {
    "name": "ARK: Survival Ascended",
    "slug": "ark-survival-ascended"
  },
  {
    "name": "Elder Scrolls Online",
    "slug": "elder-scrolls-online"
  },
  {
    "name": "Final Fantasy XIV",
    "slug": "final-fantasy-xiv"
  },
  {
    "name": "Enshrouded",
    "slug": "enshrouded"
  },
  {
    "name": "Genshin Impact",
    "slug": "genshin-impact"
  },
  {
    "name": "EA SPORTS FC 25",
    "slug": "ea-sports-fc-25"
  },
  {
    "name": "Euro Truck Simulator 2",
    "slug": "euro-truck-simulator-2"
  },
  {
    "name": "Don't Starve Together",
    "slug": "dont-starve-together"
  },
  {
    "name": "Fortnite",
    "slug": "fortnite"
  },
  {
    "name": "Grounded",
    "slug": "grounded"
  },
  {
    "name": "Microsoft Flight Simulator 2020",
    "slug": "microsoft-flight-simulator"
  },
  {
    "name": "Diablo III",
    "slug": "diablo-iii"
  },
  {
    "name": "Deep Rock Galactic",
    "slug": "deep-rock-galactic"
  },
  {
    "name": "EA SPORTS FC 24",
    "slug": "ea-sports-fc-24"
  },
  {
    "name": "EVE Online",
    "slug": "eve-online"
  },
  {
    "name": "Heroes of the Storm",
    "slug": "heroes-of-the-storm"
  },
  {
    "name": "Honkai: Star Rail",
    "slug": "honkai-star-rail"
  },
  {
    "name": "DOOM Eternal",
    "slug": "doom-eternal"
  },
  {
    "name": "Fall Guys: Ultimate Knockout",
    "slug": "fall-guys-ultimate-knockout"
  },
  {
    "name": "Forza Horizon 5",
    "slug": "forza-horizon-5"
  },
  {
    "name": "Farming Simulator 22",
    "slug": "farming-simulator-22"
  },
  {
    "name": "Halls Of Torment",
    "slug": "halls-of-torment"
  },
  {
    "name": "Garry's Mod",
    "slug": "garrys-mod"
  },
  {
    "name": "Diablo 4",
    "slug": "diablo-4"
  },
  {
    "name": "ELDEN RING",
    "slug": "elden-ring"
  },
  {
    "name": "Hearthstone",
    "slug": "hearthstone"
  },
  {
    "name": "Deep Rock Galactic: Survivor",
    "slug": "deep-rock-galactic-survivor"
  },
  {
    "name": "Destiny 2",
    "slug": "destiny-2"
  },
  {
    "name": "Dota 2",
    "slug": "dota-2"
  },
  {
    "name": "Factorio",
    "slug": "factorio"
  },
  {
    "name": "Total War: Warhammer 3",
    "slug": "total-war-warhammer-3"
  },
  {
    "name": "Warframe",
    "slug": "warframe"
  },
  {
    "name": "Minecraft Dungeons",
    "slug": "minecraft-dungeons"
  },
  {
    "name": "World of Warcraft",
    "slug": "world-of-warcraft"
  },
  {
    "name": "Lost Ark",
    "slug": "lost-ark"
  },
  {
    "name": "Enlisted",
    "slug": "enlisted"
  },
  {
    "name": "For Honor",
    "slug": "for-honor"
  },
  {
    "name": "Lethal Company",
    "slug": "lethal-company"
  },
  {
    "name": "Last Epoch",
    "slug": "last-epoch"
  },
  {
    "name": "Legends of Runeterra",
    "slug": "legends-of-runeterra"
  },
  {
    "name": "NARAKA: BLADEPOINT",
    "slug": "naraka-bladepoint"
  },
  {
    "name": "Manor Lords",
    "slug": "manor-lords"
  },
  {
    "name": "StarCraft II",
    "slug": "starcraft-ii"
  },
  {
    "name": "Guild Wars 2",
    "slug": "guild-wars-2"
  },
  {
    "name": "Icarus",
    "slug": "icarus"
  },
  {
    "name": "HELLDIVERS 2",
    "slug": "helldivers-2"
  },
  {
    "name": "Fallout 76",
    "slug": "fallout-76"
  },
  {
    "name": "Hell Let Loose",
    "slug": "hell-let-loose"
  },
  {
    "name": "Sons of the Forest",
    "slug": "sons-of-the-forest"
  },
  {
    "name": "Squad",
    "slug": "squad"
  },
  {
    "name": "Grand Theft Auto 5",
    "slug": "grand-theft-auto-5"
  },
  {
    "name": "Spectre Divide",
    "slug": "spectre-divide"
  },
  {
    "name": "Star Citizen",
    "slug": "star-citizen"
  },
  {
    "name": "Hearts of Iron 4",
    "slug": "hearts-of-iron-4"
  },
  {
    "name": "The First Descendant",
    "slug": "the-first-descendant"
  },
  {
    "name": "Starfield",
    "slug": "starfield"
  },
  {
    "name": "Team Fortress 2",
    "slug": "team-fortress-2"
  },
  {
    "name": "The Division 2",
    "slug": "the-division-2"
  },
  {
    "name": "Satisfactory",
    "slug": "satisfactory"
  },
  {
    "name": "The Finals",
    "slug": "the-finals"
  },
  {
    "name": "SMITE",
    "slug": "smite"
  },
  {
    "name": "Halo: The Master Chief Collection",
    "slug": "halo-the-master-chief-collection"
  },
  {
    "name": "No Man's Sky",
    "slug": "no-mans-sky"
  },
  {
    "name": "The Outlast Trials",
    "slug": "the-outlast-trials"
  },
  {
    "name": "League of Legends",
    "slug": "league-of-legends"
  },
  {
    "name": "Risk of Rain 2",
    "slug": "risk-of-rain-2"
  },
  {
    "name": "XDefiant",
    "slug": "xdefiant"
  },
  {
    "name": "Phasmophobia",
    "slug": "phasmophobia"
  },
  {
    "name": "Teamfight Tactics",
    "slug": "teamfight-tactics"
  },
  {
    "name": "V Rising",
    "slug": "v-rising"
  },
  {
    "name": "Valorant",
    "slug": "valorant"
  },
  {
    "name": "RuneScape (Old School)",
    "slug": "runescape-old-school"
  },
  {
    "name": "Red Dead Redemption 2",
    "slug": "red-dead-redemption-2"
  },
  {
    "name": "Path of Exile",
    "slug": "path-of-exile"
  },
  {
    "name": "THRONE AND LIBERTY",
    "slug": "throne-and-liberty"
  },
  {
    "name": "Warhammer 40,000: Space Marine 2",
    "slug": "warhammer-40000-space-marine-2"
  },
  {
    "name": "PUBG: BATTLEGROUNDS",
    "slug": "pubg-battlegrounds"
  },
  {
    "name": "MultiVersus",
    "slug": "multiversus"
  },
  {
    "name": "PAYDAY 2",
    "slug": "payday-2"
  },
  {
    "name": "Tekken 8",
    "slug": "tekken-8"
  },
  {
    "name": "Palworld",
    "slug": "palworld"
  },
  {
    "name": "Monster Hunter Rise",
    "slug": "monster-hunter-rise"
  },
  {
    "name": "Once Human",
    "slug": "once-human"
  },
  {
    "name": "New World",
    "slug": "new-world"
  },
  {
    "name": "VRChat",
    "slug": "vrchat"
  },
  {
    "name": "Mount & Blade II: Bannerlord",
    "slug": "mount-and-blade-ii-bannerlord"
  },
  {
    "name": "Warhammer 40,000: Darktide",
    "slug": "warhammer-40000-darktide"
  },
  {
    "name": "Overwatch 2",
    "slug": "overwatch-2"
  },
  {
    "name": "SCUM",
    "slug": "scum"
  },
  {
    "name": "Raft",
    "slug": "raft"
  },
  {
    "name": "RuneScape",
    "slug": "runescape"
  },
  {
    "name": "Ready or Not",
    "slug": "ready-or-not"
  },
  {
    "name": "Stellaris",
    "slug": "stellaris"
  },
  {
    "name": "Sea of Thieves",
    "slug": "sea-of-thieves"
  },
  {
    "name": "The Isle",
    "slug": "the-isle"
  },
  {
    "name": "World of Warcraft: Classic",
    "slug": "world-of-warcraft-classic"
  },
  {
    "name": "Skull and Bones",
    "slug": "skull-and-bones"
  },
  {
    "name": "Rust",
    "slug": "rust"
  },
  {
    "name": "World of Warships",
    "slug": "world-of-warships"
  },
  {
    "name": "Rocket League",
    "slug": "rocket-league"
  },
  {
    "name": "RimWorld",
    "slug": "rimworld"
  },
  {
    "name": "osu!",
    "slug": "osu"
  },
  {
    "name": "Valheim",
    "slug": "valheim"
  },
  {
    "name": "Vermintide 2",
    "slug": "vermintide-2"
  },
  {
    "name": "Minecraft",
    "slug": "minecraft"
  },
  {
    "name": "Paladins",
    "slug": "paladins"
  },
  {
    "name": "Unturned",
    "slug": "unturned"
  },
  {
    "name": "World of Tanks",
    "slug": "world-of-tanks"
  },
  {
    "name": "War Thunder",
    "slug": "war-thunder"
  },
  {
    "name": "Rainbow Six Siege",
    "slug": "rainbow-6-siege"
  }
];

export default games;
