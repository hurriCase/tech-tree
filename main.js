// ── i18n ──────────────────────────────────────
const I18N = {
  en: {
    unlocks: 'Unlocks', requires: 'Requires',
    legReq: 'Required', legOr: 'Any of',
    orReq: 'any of', andReq: 'required',
    eraUnlock: 'Era Unlock', wonder: 'Wonder',
    labelBeaker: 'Beakers', labelCost: 'Coins',
    era1: 'Ancient', era2: 'Classical', era3: 'Antiquity',
    era4: 'Medieval', era5: 'Renaissance', era6: 'Industrial',
    eraW: 'Wonders',
    chainCost: 'Chain Cost', chainRemaining: 'Remaining to research',
    chainSkippedBc: 'skipped', chainSkippedCost: 'skipped',
    researchTime: 'research time',
    queueTitle: 'Research Queue', queueClear: 'Clear',
    queueAdd: '+ Add to Queue', queueRemove: '− Remove from Queue',
    queueEmpty: 'Queue is empty',
    queueError: 'Cannot queue — dependency not ready:',
    queueTotal: 'Total remaining:',
    cityTitle: 'City Settings',
    cityBeakers: 'Beakers per hour',
    cityBeakersHint: 'Used to calculate research time',
    cityTowns: 'Count Towns',
    cityTownsHint: 'Each town adds +10% to beaker cost',
    searchPlaceholder: 'Search…',
    viewAll: 'All', viewDone: '✓ Checked', viewUndone: '○ Unchecked',
  },
  ru: {
    unlocks: 'Открывает', requires: 'Требует',
    legReq: 'Обязательно', legOr: 'Любое из',
    orReq: 'любое из', andReq: 'обязательно',
    eraUnlock: 'Эпоха', wonder: 'Чудо',
    labelBeaker: 'Наука', labelCost: 'Монеты',
    era1: 'Древняя', era2: 'Классическая', era3: 'Античность',
    era4: 'Средневековье', era5: 'Ренессанс', era6: 'Индустриальная',
    eraW: 'Чудеса',
    chainCost: 'Стоимость цепочки', chainRemaining: 'Осталось исследовать',
    chainSkippedBc: 'пропущено', chainSkippedCost: 'пропущено',
    researchTime: 'время исследования',
    queueTitle: 'Очередь исследований', queueClear: 'Очистить',
    queueAdd: '+ В очередь', queueRemove: '− Убрать из очереди',
    queueEmpty: 'Очередь пуста',
    queueError: 'Нельзя добавить — зависимость не готова:',
    queueTotal: 'Итого осталось:',
    cityTitle: 'Настройки города',
    cityBeakers: 'Наука в час',
    cityBeakersHint: 'Используется для расчёта времени исследования',
    cityTowns: 'Количество городов',
    cityTownsHint: 'Каждый город добавляет +10% к стоимости науки',
    searchPlaceholder: 'Поиск…',
    viewAll: 'Все', viewDone: '✓ Изучено', viewUndone: '○ Не изучено',
  }
};

const ERA_COLORS = { 1: '#4a90c4', 2: '#56b87a', 3: '#c8832a', 4: '#c44b7a', 5: '#7a5bc4', 6: '#c45050', 0: '#c8a84b' };

// ── Tech data ─────────────────────────────────
const TECHS = [
  { id: 'tech_ancient_era', name: 'Ancient Era', era: 1, bc: 0, cost: 0, req: null, unlock_era: true, desc: 'Unlocks Policies, Explorer Unit, Lumberjack Unit, Miner Unit' },
  { id: 'tech_belief', name: 'Belief', era: 1, bc: 25, cost: 25, req: 'tech_ancient_era', desc: 'Unlocks Monument' },
  { id: 'tech_mining', name: 'Mining', era: 1, bc: 1000, cost: 2500, req: 'tech_belief', desc: 'Unlocks Trommel' },
  { id: 'tech_agriculture', name: 'Agriculture', era: 1, bc: 1000, cost: 2500, req: 'tech_belief', desc: 'Unlocks Farm' },
  { id: 'tech_laws', name: 'Laws', era: 1, bc: 1000, cost: 2500, req: 'tech_belief', desc: 'Unlocks Bank' },
  { id: 'tech_pantheon', name: 'Pantheon', era: 1, bc: 1000, cost: 2500, req: 'tech_belief', desc: 'Unlocks Altar' },
  { id: 'tech_classical_era', name: 'Classical Era', era: 2, bc: 1750, cost: 5000, req: 'tech_mining/tech_agriculture/tech_laws/tech_pantheon', unlock_era: true, desc: 'Unlocks +2 Unit Level, Civics' },
  { id: 'tech_artisanship', name: 'Artisanship', era: 2, bc: 2500, cost: 5000, req: 'tech_classical_era', desc: "Unlocks Forge, Archer's Workshop, Tier 1 Metal, Tier 1 Sword, Tier 1 Enderbow" },
  { id: 'tech_iron_working', name: 'Iron Working', era: 2, bc: 2500, cost: 5000, req: 'tech_classical_era', desc: 'Unlocks Tier 1 Bow, Tier 1 Crossbow, Tier 1 Axe, Tier 1 Shield' },
  { id: 'tech_armory', name: 'Armory', era: 2, bc: 2500, cost: 5000, req: 'tech_classical_era:tech_mining', desc: 'Unlocks Barracks, Warrior Unit, Archer Unit, Hoplite Unit' },
  { id: 'tech_productivity', name: 'Productivity', era: 2, bc: 2500, cost: 5000, req: 'tech_classical_era:tech_mining', desc: 'Unlocks Mine, Tree Farm' },
  { id: 'tech_pottery', name: 'Pottery', era: 2, bc: 2500, cost: 5000, req: 'tech_classical_era:tech_agriculture', desc: 'Unlocks Granary, Cottage' },
  { id: 'tech_calendar', name: 'Calendar', era: 2, bc: 2500, cost: 5000, req: 'tech_classical_era:tech_laws', desc: 'Unlocks Library' },
  { id: 'tech_state_workforce', name: 'State Workforce', era: 2, bc: 2500, cost: 5000, req: 'tech_classical_era:tech_laws', desc: 'Unlocks Hamlet' },
  { id: 'tech_brewing', name: 'Brewing', era: 2, bc: 5000, cost: 7500, req: 'tech_classical_era:tech_pantheon', desc: 'Unlocks Alchemy Store' },
  { id: 'tech_masonry', name: 'Masonry', era: 2, bc: 5000, cost: 7500, req: 'tech_armory:tech_productivity', desc: 'Unlocks Arrow Tower, Arrow Tower Walls, Scout Tower, Scout Tower Walls and Upgrade Civilization Project' },
  { id: 'tech_toolsmithing', name: 'Toolsmithing', era: 2, bc: 5000, cost: 7500, req: 'tech_productivity', desc: 'Unlocks Smeltery, Fletchery' },
  { id: 'tech_the_wheel', name: 'The Wheel', era: 2, bc: 5000, cost: 7500, req: 'tech_pottery', desc: 'Unlocks Windmill, Sawmill, +20 Growth per Culture Zone' },
  { id: 'tech_animal_husbandry', name: 'Animal Husbandry', era: 2, bc: 5000, cost: 7500, req: 'tech_pottery', desc: 'Unlocks Pasture, Stable' },
  { id: 'tech_code_of_laws', name: 'Code of Laws', era: 2, bc: 5000, cost: 7500, req: 'tech_state_workforce', desc: 'Unlocks Village, +10% coins from Quests' },
  { id: 'tech_construction_site', name: 'Construction Site', era: 2, bc: 10000, cost: 10000, req: 'tech_toolsmithing', desc: 'Unlocks Quarry, Trommel Level' },
  { id: 'tech_land_taxes', name: 'Land Taxes', era: 2, bc: 10000, cost: 10000, req: 'tech_the_wheel:tech_animal_husbandry', desc: 'Unlocks +10% Cottage income, Cottage Level' },
  { id: 'tech_trading', name: 'Trading', era: 2, bc: 10000, cost: 10000, req: 'tech_animal_husbandry', desc: 'Unlocks Trade Outpost, Tree Farm Level' },
  { id: 'tech_writing', name: 'Writing', era: 2, bc: 10000, cost: 10000, req: 'tech_calendar', desc: 'Unlocks Bank Level, Cottage Level' },
  { id: 'tech_monarchy', name: 'Monarchy', era: 2, bc: 10000, cost: 10000, req: 'tech_code_of_laws:tech_brewing', desc: 'Unlocks Large Village, Cottage Level' },
  { id: 'tech_antiquity_era', name: 'Antiquity Era', era: 3, bc: 15000, cost: 15000, req: 'tech_construction_site/tech_land_taxes/tech_trading/tech_writing/tech_monarchy', unlock_era: true, desc: 'Unlocks Settler Unit, +2 Unit Level, +1 active Warlord Limit, +1 Wonder research slot' },
  { id: 'tech_steel_working', name: 'Steel Working', era: 3, bc: 17500, cost: 15000, req: 'tech_antiquity_era:tech_iron_working', desc: 'Unlocks Tier 2 Bow, Tier 2 Crossbow, Tier 2 Axe, Tier 2 Shield' },
  { id: 'tech_craftsmanship', name: 'Craftsmanship', era: 3, bc: 17500, cost: 15000, req: 'tech_antiquity_era:tech_artisanship', desc: 'Unlocks Tier 2 leather, Tier 2 Metal, Tier 2 Sword, Tier 2 Enderbow' },
  { id: 'tech_castles', name: 'Castles', era: 3, bc: 17500, cost: 15000, req: 'tech_antiquity_era:tech_masonry', desc: 'Unlocks Wall, +10 HP to Control Points' },
  { id: 'tech_military_tradition', name: 'Military Tradition', era: 3, bc: 17500, cost: 15000, req: 'tech_antiquity_era:tech_masonry', desc: 'Unlocks Engineer Unit, Military unit promotions' },
  { id: 'tech_deep_mining', name: 'Deep Mining', era: 3, bc: 17500, cost: 15000, req: 'tech_antiquity_era:tech_construction_site:tech_land_taxes', desc: 'Unlocks Quarry Level, Mine Level' },
  { id: 'tech_commerce', name: 'Commerce', era: 3, bc: 17500, cost: 15000, req: 'tech_antiquity_era:tech_toolsmithing:tech_land_taxes:tech_trading', desc: 'Unlocks Pasture Level, Tree Farm Level' },
  { id: 'tech_horseback_riding', name: 'Horseback Riding', era: 3, bc: 17500, cost: 15000, req: 'tech_antiquity_era:tech_trading', desc: 'Unlocks Pasture Level, +20% travel range' },
  { id: 'tech_minting', name: 'Minting', era: 3, bc: 17500, cost: 15000, req: 'tech_antiquity_era:tech_writing', desc: 'Unlocks Bank Level, +10% Cottage income' },
  { id: 'tech_barter', name: 'Barter', era: 3, bc: 17500, cost: 15000, req: 'tech_antiquity_era:tech_trading', desc: 'Unlocks Bank Level, Market' },
  { id: 'tech_early_empire', name: 'Early Empire', era: 3, bc: 17500, cost: 15000, req: 'tech_antiquity_era:tech_monarchy', desc: 'Unlocks Cottage Level, Warehouse' },
  { id: 'tech_foundation', name: 'Foundation', era: 3, bc: 30000, cost: 20000, req: 'tech_castles:tech_deep_mining', desc: 'Unlocks Your tile improvement start one level higher, Tower Level, Windmill Level' },
  { id: 'tech_sifting', name: 'Sifting', era: 3, bc: 30000, cost: 20000, req: 'tech_military_tradition:tech_deep_mining', desc: 'Unlocks Trommel Level, Smeltery Level' },
  { id: 'tech_sailing', name: 'Sailing', era: 3, bc: 30000, cost: 20000, req: 'tech_commerce', desc: 'Unlocks Shipyard, Fishing Boat' },
  { id: 'tech_conservation', name: 'Conservation', era: 3, bc: 30000, cost: 20000, req: 'tech_horseback_riding:tech_minting', desc: 'Unlocks Butchery' },
  { id: 'tech_priesthood', name: 'Priesthood', era: 3, bc: 30000, cost: 20000, req: 'tech_barter:tech_early_empire', desc: 'Unlocks Temple, Alchemy Store Level' },
  { id: 'tech_guilds', name: 'Guilds', era: 3, bc: 30000, cost: 20000, req: 'tech_early_empire', desc: 'Unlocks Bank Level, Adventurers Guild' },
  { id: 'tech_logistic', name: 'Logistic', era: 3, bc: 55000, cost: 40000, req: 'tech_foundation', desc: 'Unlocks Temple Level' },
  { id: 'tech_gunpowder', name: 'Gunpowder', era: 3, bc: 55000, cost: 40000, req: 'tech_foundation', desc: 'Unlocks Cannon Tower, Cannon Tower Walls, Tree Farm Level, +0.25 hammer per plain and desert chunk' },
  { id: 'tech_open_field_excavation', name: 'Open Field Excavation', era: 3, bc: 55000, cost: 40000, req: 'tech_sifting:tech_sailing', desc: 'Unlocks Mine Level, Quarry Level, +15 Culture per Culture Zone' },
  { id: 'tech_aquaculture', name: 'Aquaculture', era: 3, bc: 55000, cost: 40000, req: 'tech_sailing', desc: 'Unlocks Alchemy Store Level, Fletchery Level, Windmill Level, +0.25 growth per Savannah and Mesa chunk' },
  { id: 'tech_baking', name: 'Baking', era: 3, bc: 55000, cost: 40000, req: 'tech_sailing:tech_horseback_riding', desc: 'Unlocks Bakery, Pasture Level' },
  { id: 'tech_printing_press', name: 'Printing Press', era: 3, bc: 55000, cost: 40000, req: 'tech_conservation:tech_priesthood', desc: 'Unlocks +10% Culture Rate' },
  { id: 'tech_scholarship', name: 'Scholarship', era: 3, bc: 55000, cost: 40000, req: 'tech_conservation:tech_guilds', desc: 'Unlocks Library Level, Alchemy Store Level' },
  { id: 'tech_global_trade', name: 'Global Trade', era: 3, bc: 55000, cost: 40000, req: 'tech_priesthood', desc: 'Unlocks +1 similar trade good income multiplier' },
  { id: 'tech_feudalism', name: 'Feudalism', era: 3, bc: 55000, cost: 40000, req: 'tech_guilds', desc: 'Unlocks Town, Cottage Level' },
  { id: 'tech_medieval_era', name: 'Medieval Era', era: 4, bc: 125000, cost: 125000, req: 'tech_logistic/tech_gunpowder/tech_open_field_excavation/tech_aquaculture/tech_baking/tech_printing_press/tech_scholarship/tech_global_trade/tech_feudalism', unlock_era: true, desc: 'Unlocks +2 Unit Level, +1 active Warlord Limit, +1 Wonder research slot, Allow buying of Economic victory point every 7 days, Government change allowed (City States), 15% beaker/coin discount for technology' },
  { id: 'tech_carbide_working', name: 'Carbide Working', era: 4, bc: 100000, cost: 150000, req: 'tech_medieval_era:tech_steel_working', desc: 'Unlocks Tier 3 Bow, Tier 3 Crossbow, Tier 3 Axe, Tier 3 Shield' },
  { id: 'tech_chemical_bonding', name: 'Chemical Bonding', era: 4, bc: 100000, cost: 150000, req: 'tech_medieval_era:tech_craftsmanship', desc: 'Unlocks Tier 3 Metal, Tier 3 Leather, Tier 3 Sword, Tier 3 Enderbow' },
  { id: 'tech_philosophy', name: 'Philosophy', era: 4, bc: 100000, cost: 100000, req: 'tech_medieval_era:tech_logistic', desc: 'Unlocks Cottage Level, Library Level' },
  { id: 'tech_mining_guilds', name: 'Mining Guilds', era: 4, bc: 100000, cost: 100000, req: 'tech_medieval_era:tech_gunpowder:tech_open_field_excavation', desc: 'Unlocks Mine Level, Smeltery Level, +10% Bank Rate' },
  { id: 'tech_rationalism', name: 'Rationalism', era: 4, bc: 100000, cost: 100000, req: 'tech_medieval_era:tech_aquaculture', desc: 'Unlocks Lab, Alchemy Store Level' },
  { id: 'tech_exploration', name: 'Exploration', era: 4, bc: 100000, cost: 100000, req: 'tech_medieval_era:tech_aquaculture', desc: 'Unlocks Lighthouse, Scout Ship' },
  { id: 'tech_ritual', name: 'Ritual', era: 4, bc: 100000, cost: 100000, req: 'tech_medieval_era:tech_printing_press', desc: 'Unlocks Temple Level, Marketplace Level' },
  { id: 'tech_currency', name: 'Currency', era: 4, bc: 100000, cost: 100000, req: 'tech_medieval_era:tech_global_trade:tech_feudalism', desc: 'Unlocks Bank Level, Butchery Level' },
  { id: 'tech_construction', name: 'Construction', era: 4, bc: 100000, cost: 100000, req: 'tech_medieval_era:tech_feudalism', desc: 'Unlocks Large Town, Marketplace Level' },
  { id: 'tech_siege_tactics', name: 'Siege Tactics', era: 4, bc: 200000, cost: 200000, req: 'tech_philosophy:tech_gunpowder', desc: 'Unlocks +1 damage against walls, Destroying a structure gives 25% of cost in coins, +0.35 beaker per forest chunk' },
  { id: 'tech_branch_mining', name: 'Branch Mining', era: 4, bc: 200000, cost: 200000, req: 'tech_mining_guilds', desc: 'Unlocks 15% smelting bonus, +0.5 hammers per Taiga & Tundra chunks' },
  { id: 'tech_turbines', name: 'Turbines', era: 4, bc: 200000, cost: 200000, req: 'tech_rationalism', desc: 'Unlocks Windmill Level, +0.25 beaker per Ocean chunk' },
  { id: 'tech_importation', name: 'Importation', era: 4, bc: 200000, cost: 200000, req: 'tech_exploration', desc: 'Unlocks +1 Happiness per Trade Good' },
  { id: 'tech_ideology', name: 'Ideology', era: 4, bc: 200000, cost: 200000, req: 'tech_exploration:tech_ritual', desc: 'Unlocks +0.25 Beaker per jungle and mushroom chunk' },
  { id: 'tech_compass', name: 'Compass', era: 4, bc: 200000, cost: 200000, req: 'tech_exploration', desc: 'Unlocks Arrow Ship, Cannon Ship, Fletchery Level' },
  { id: 'tech_education', name: 'Education', era: 4, bc: 200000, cost: 200000, req: 'tech_scholarship:tech_currency', desc: 'Unlocks Library Level, Lab Level' },
  { id: 'tech_taxation', name: 'Taxation', era: 4, bc: 200000, cost: 200000, req: 'tech_currency', desc: 'Unlocks Pasture Level, Marketplace Level' },
  { id: 'tech_urbanization', name: 'Urbanization', era: 4, bc: 200000, cost: 200000, req: 'tech_construction', desc: 'Unlocks Tower Level, Cottage Level' },
  { id: 'tech_advanced_masonry', name: 'Advanced Masonry', era: 4, bc: 200000, cost: 200000, req: 'tech_construction', desc: 'Unlocks Your Tile Improvements start one level higher, Butchery Level' },
  { id: 'tech_fortification', name: 'Fortification', era: 4, bc: 300000, cost: 400000, req: 'tech_siege_tactics:tech_branch_mining', desc: 'Unlocks Artillery Tower, Mine Level, Fletchery Level' },
  { id: 'tech_machinery', name: 'Machinery', era: 4, bc: 300000, cost: 400000, req: 'tech_branch_mining:tech_turbines', desc: 'Unlocks Cottage Level, Butchery Level, +25% speed to Bakeries and Trommels' },
  { id: 'tech_mercantile', name: 'Mercantile', era: 4, bc: 300000, cost: 400000, req: 'tech_turbines:tech_importation', desc: 'Unlocks Tavern, +10% Trade Rate' },
  { id: 'tech_inquisition', name: 'Inquisition', era: 4, bc: 300000, cost: 400000, req: 'tech_ideology:tech_compass', desc: 'Unlocks Temple Level, +0.005 happiness per beach and swamp chunk' },
  { id: 'tech_energy_study', name: 'Energy Study', era: 4, bc: 300000, cost: 400000, req: 'tech_compass:tech_education', desc: 'Unlocks Radiance Tower, Lab Level' },
  { id: 'tech_gears', name: 'Gears', era: 4, bc: 300000, cost: 400000, req: 'tech_education', desc: 'Unlocks Bakery Level, +15% Smelting bonus' },
  { id: 'tech_banking', name: 'Banking', era: 4, bc: 300000, cost: 400000, req: 'tech_taxation', desc: 'Unlocks Bank Level, +15% coin from quests' },
  { id: 'tech_nationalism', name: 'Nationalism', era: 4, bc: 300000, cost: 400000, req: 'tech_taxation:tech_urbanization', desc: 'Unlocks City, Smeltery Level' },
  { id: 'tech_sanitization', name: 'Sanitization', era: 4, bc: 300000, cost: 400000, req: 'tech_advanced_masonry', desc: 'Unlocks Hospital, Bakery Level, +1 Growth from River chunk' },
  { id: 'tech_renaissance_era', name: 'Renaissance Era', era: 5, bc: 500000, cost: 750000, req: 'tech_fortification/tech_machinery/tech_mercantile/tech_inquisition/tech_energy_study/tech_gears/tech_banking/tech_nationalism/tech_sanitization', unlock_era: true, desc: 'Unlocks +1 active Warlord Limit, +2 Unit Level, +1 Wonder research slot' },
  { id: 'tech_composite', name: 'Composite', era: 5, bc: 425000, cost: 2000000, req: 'tech_renaissance_era:tech_chemical_bonding', desc: 'Tier 4 Metal, Tier 4 Leather, Tier 4 Sword, Tier 4 Enderbow' },
  { id: 'tech_titanium_working', name: 'Titanium Working', era: 5, bc: 425000, cost: 2000000, req: 'tech_renaissance_era:tech_carbide_working', desc: 'Unlocks Tier 4 Bow, Tier 4 Crossbow, Tier 4 Axe, Tier 4 Shield' },
  { id: 'tech_communication', name: 'Communication', era: 5, bc: 425000, cost: 1000000, req: 'tech_renaissance_era:tech_fortification', desc: 'Unlocks +400 base Culture, -75% Anarchy Timer in Towns' },
  { id: 'tech_advanced_efficiency', name: 'Advanced Efficiency', era: 5, bc: 425000, cost: 1000000, req: 'tech_renaissance_era:tech_fortification', desc: 'Unlocks Library Level, +1 XP to Structures per hourly tick' },
  { id: 'tech_engineering', name: 'Engineering', era: 5, bc: 425000, cost: 1000000, req: 'tech_renaissance_era:tech_machinery', desc: "Unlocks Tower Level, +10% Structure's Hit Points" },
  { id: 'tech_replaceable_parts', name: 'Replaceable Parts', era: 5, bc: 425000, cost: 1000000, req: 'tech_renaissance_era:tech_gears:tech_machinery', desc: 'Unlocks Butchery Level, Increases hammers per Culture Zone by 20, Increase Beakers per Culture Zone by 10' },
  { id: 'tech_tourism', name: 'Tourism', era: 5, bc: 425000, cost: 1000000, req: 'tech_renaissance_era:tech_mercantile:tech_inquisition', desc: 'Unlocks Marketplace Level, +20% travel range at Stables/Shipyards' },
  { id: 'tech_civil_service', name: 'Civil Service', era: 5, bc: 425000, cost: 1000000, req: 'tech_renaissance_era:tech_mercantile:tech_gears', desc: 'Unlocks Trommel Level, Windmill Level' },
  { id: 'tech_trade_networks', name: 'Trade Networks', era: 5, bc: 425000, cost: 1000000, req: 'tech_renaissance_era:tech_energy_study:tech_banking', desc: 'Unlocks +1 similar trade good income multiplier' },
  { id: 'tech_economics', name: 'Economics', era: 5, bc: 425000, cost: 1000000, req: 'tech_renaissance_era:tech_banking', desc: 'Unlocks Bank Level' },
  { id: 'tech_agency', name: 'Agency', era: 5, bc: 425000, cost: 1000000, req: 'tech_renaissance_era:tech_nationalism', desc: 'Unlocks Lab Level, Alchemy Store Level' },
  { id: 'tech_politics', name: 'Politics', era: 5, bc: 425000, cost: 1000000, req: 'tech_renaissance_era:tech_nationalism:tech_sanitization', desc: 'Unlocks Large City, Tower Level' },
  { id: 'tech_core_mining', name: 'Core Mining', era: 5, bc: 425000, cost: 600000, req: 'tech_renaissance_era:tech_urbanization', desc: 'Unlocks Quarry Level, Trommel Level, Mine Level, Smeltery Level' },
  { id: 'tech_radio', name: 'Radio', era: 5, bc: 500000, cost: 1500000, req: 'tech_communication', desc: 'Unlocks +20% XP for units, Reduce cost of Unit Promotions by 10% (Hammer and Growth)' },
  { id: 'tech_globalization', name: 'Globalization', era: 5, bc: 500000, cost: 1500000, req: 'tech_communication:tech_advanced_efficiency', desc: 'Unlocks Temple Level, +1 Culture Zones to all towns in Civ and gain another +1 when your Town has the Metropolis Upgrade' },
  { id: 'tech_industrialization', name: 'Industrialization', era: 5, bc: 500000, cost: 1500000, req: 'tech_advanced_efficiency:tech_engineering:tech_replaceable_parts', desc: 'Unlocks Fletchery Level, +4 Tile improvement slot in every town' },
  { id: 'tech_world_trade', name: 'World Trade', era: 5, bc: 500000, cost: 1500000, req: 'tech_engineering:tech_replaceable_parts:tech_tourism', desc: 'Unlocks Bank Level, Metropolis and Capital Levels' },
  { id: 'tech_cultural_heritage', name: 'Cultural Heritage', era: 5, bc: 500000, cost: 1500000, req: 'tech_tourism:tech_trade_networks', desc: 'Unlocks Temple Level, +5% Culture Rate per Trade Good' },
  { id: 'tech_experimentation', name: 'Experimentation', era: 5, bc: 500000, cost: 1500000, req: 'tech_civil_service:tech_trade_networks', desc: 'Unlocks Arcane Tower, Lab Level' },
  { id: 'tech_stock_market', name: 'Stock Market', era: 5, bc: 500000, cost: 1500000, req: 'tech_trade_networks:tech_economics', desc: 'Unlocks Bank Level' },
  { id: 'tech_capitalism', name: 'Capitalism', era: 5, bc: 500000, cost: 1500000, req: 'tech_economics:tech_agency', desc: 'Unlocks +1 similar trade good income multiplier' },
  { id: 'tech_hydroponics', name: 'Hydroponics', era: 5, bc: 500000, cost: 1500000, req: 'tech_agency:tech_politics', desc: 'Unlocks Pasture Level, Bakery Level, Pasture require 750 growth instead of 1000 growth per bonus egg' },
  { id: 'tech_industrial_era', name: 'Industrial Era', era: 6, bc: 1000000, cost: 5000000, req: 'tech_radio/tech_globalization/tech_industrialization/tech_world_trade/tech_cultural_heritage/tech_experimentation/tech_stock_market/tech_capitalism/tech_hydroponics', unlock_era: true, desc: 'Unlocks +1 Unit Level, +1 Wonder research slot' },
  { id: 'tech_abyssal_composites', name: 'Abyssal Composite', era: 6, bc: 1000000, cost: 1500000, req: 'tech_industrial_era:tech_composite', desc: 'Tier 5 Metal, Tier 5 Leather, Tier 5 Sword, Tier 5 Enderbow' },
  { id: 'tech_abyssal_working', name: 'Abyssal Working', era: 6, bc: 1000000, cost: 2500000, req: 'tech_industrial_era:tech_titanium_working', desc: 'Unlocks Tier 5 Bow, Tier 5 Crossbow, Tier 5 Axe, Tier 5 Shield' },
  { id: 'tech_council_of_eight', name: 'Council Of Eight', era: 6, bc: 1000000, cost: 1000000, req: 'tech_industrial_era:tech_experimentation:tech_stock_market:tech_capitalism:tech_hydroponics', wonder: true, desc: 'Unlocks The Council of Eight' },
  { id: 'tech_robotics', name: 'Robotics', era: 6, bc: 2000000, cost: 2500000, req: 'tech_industrial_era:tech_abyssal_working:tech_abyssal_composites:tech_radio:tech_industrialization', desc: 'Gives you 3 Victory Points for the first level 10 military unit, Every week you gain 1 Victory Point for every different type of military unit at lvl 10' },
  { id: 'tech_enlightenment', name: 'Enlightenment', era: 6, bc: 5000000, cost: 25000000, req: 'tech_industrial_era:tech_globalization:tech_industrialization:tech_world_trade:tech_cultural_heritage', desc: 'Gives you 3 Victory Points upon completion, and grants you 1 Victory Point per week' },
];

const WONDERS = [
  { id: 'tech_great_pyramid', name: 'Great Pyramid', bc: 75000, desc: 'Unlocks The Great Pyramid' },
  { id: 'tech_great_lighthouse', name: 'Great Lighthouse', bc: 75000, desc: 'Unlocks The Great Lighthouse' },
  { id: 'tech_hanging_gardens', name: 'Hanging Gardens', bc: 75000, desc: 'Unlocks The Hanging Gardens' },
  { id: 'tech_colossus', name: 'Colossus', bc: 75000, desc: 'Unlocks The Colossus' },
  { id: 'tech_grand_ship_ingermanland', name: 'Grand Ship Ingermanland', bc: 75000, desc: 'Unlocks The Grand Ship Ingermanland' },
  { id: 'tech_taj_mahal', name: 'Taj Mahal', bc: 75000, desc: 'Unlocks The Taj Mahal' },
  { id: 'tech_temple_of_artemis', name: 'Temple of Artemis', bc: 75000, desc: 'Unlocks The Temple of Artemis' },
  { id: 'tech_statue_of_liberty', name: 'Statue of Liberty', bc: 75000, desc: 'Unlocks The Statue of Liberty' },
  { id: 'tech_notre_dame', name: 'Notre Dame', bc: 75000, desc: 'Unlocks The Notre Dame' },
  { id: 'tech_colosseum', name: 'Colosseum', bc: 75000, desc: 'Unlocks The Colosseum' },
  { id: 'tech_global_stock_exchange', name: 'Global Stock Exchange', bc: 75000, desc: 'Unlocks The Global Stock Exchange' },
  { id: 'tech_oxford_university', name: 'Oxford University', bc: 75000, desc: 'Unlocks The Oxford University' },
  { id: 'tech_himeji', name: 'Himeji Castle', bc: 75000, desc: 'Unlocks The Himeji Castle' },
  { id: 'tech_kremlin', name: 'Kremlin', bc: 75000, desc: 'Unlocks The Kremlin' },
  { id: 'tech_huey_teocalli', name: 'Huey Teocalli', bc: 75000, desc: 'Unlocks The Huey Teocalli' },
  { id: 'tech_porcelain_tower', name: 'Porcelain Tower', bc: 75000, desc: 'Unlocks The Porcelain Tower' },
  { id: 'tech_angkor_wat', name: 'Angkor Wat', bc: 75000, desc: 'Unlocks The Angkor Wat' },
  { id: 'tech_great_library', name: 'Great Library', bc: 75000, desc: 'Unlocks The Great Library' },
  { id: 'tech_chichen_itza', name: 'Chichen Itza', bc: 75000, desc: 'Unlocks The Chichen Itza' },
  { id: 'tech_big_ben', name: 'Big Ben', bc: 75000, desc: 'Unlocks The Big Ben' },
  { id: 'tech_globe_theatre', name: 'Globe Theatre', bc: 75000, desc: 'Unlocks The Globe Theatre' },
  { id: 'tech_oracle', name: 'Oracle', bc: 75000, desc: 'Unlocks The Oracle' },
  { id: 'tech_brandenburg_gate', name: 'Brandenburg Gate', bc: 75000, desc: 'Unlocks The Brandenburg Gate' },
];

const NAMES_RU = {
  'tech_ancient_era': 'Древняя Эпоха', 'tech_belief': 'Вера', 'tech_mining': 'Горное дело',
  'tech_agriculture': 'Земледелие', 'tech_laws': 'Законы', 'tech_pantheon': 'Пантеон',
  'tech_classical_era': 'Классическая Эпоха', 'tech_artisanship': 'Ремесло',
  'tech_iron_working': 'Обработка железа', 'tech_armory': 'Оружейная',
  'tech_productivity': 'Производительность', 'tech_pottery': 'Гончарство',
  'tech_calendar': 'Календарь', 'tech_state_workforce': 'Государственный труд',
  'tech_brewing': 'Пивоварение', 'tech_masonry': 'Каменная кладка',
  'tech_toolsmithing': 'Кузнечное дело', 'tech_the_wheel': 'Колесо',
  'tech_animal_husbandry': 'Скотоводство', 'tech_code_of_laws': 'Свод законов',
  'tech_construction_site': 'Стройплощадка', 'tech_land_taxes': 'Земельные налоги',
  'tech_trading': 'Торговля', 'tech_writing': 'Письмо', 'tech_monarchy': 'Монархия',
  'tech_antiquity_era': 'Античная Эпоха', 'tech_steel_working': 'Обработка стали',
  'tech_craftsmanship': 'Мастерство', 'tech_castles': 'Замки',
  'tech_military_tradition': 'Военная традиция', 'tech_deep_mining': 'Глубокая добыча',
  'tech_commerce': 'Коммерция', 'tech_horseback_riding': 'Верховая езда',
  'tech_minting': 'Чеканка монет', 'tech_barter': 'Бартер',
  'tech_early_empire': 'Ранняя империя', 'tech_foundation': 'Фундамент',
  'tech_sifting': 'Просеивание', 'tech_sailing': 'Мореплавание',
  'tech_conservation': 'Сохранение', 'tech_priesthood': 'Жречество',
  'tech_guilds': 'Гильдии', 'tech_logistic': 'Логистика', 'tech_gunpowder': 'Порох',
  'tech_open_field_excavation': 'Открытые раскопки', 'tech_aquaculture': 'Аквакультура',
  'tech_baking': 'Выпечка', 'tech_printing_press': 'Печатный станок',
  'tech_scholarship': 'Учёность', 'tech_global_trade': 'Мировая торговля',
  'tech_feudalism': 'Феодализм', 'tech_medieval_era': 'Средневековая Эпоха',
  'tech_carbide_working': 'Обработка карбида', 'tech_chemical_bonding': 'Химические связи',
  'tech_philosophy': 'Философия', 'tech_mining_guilds': 'Горняцкие гильдии',
  'tech_rationalism': 'Рационализм', 'tech_exploration': 'Исследование',
  'tech_ritual': 'Ритуал', 'tech_currency': 'Валюта', 'tech_construction': 'Строительство',
  'tech_siege_tactics': 'Осадная тактика', 'tech_branch_mining': 'Шахтная добыча',
  'tech_turbines': 'Турбины', 'tech_importation': 'Импорт', 'tech_ideology': 'Идеология',
  'tech_compass': 'Компас', 'tech_education': 'Образование', 'tech_taxation': 'Налогообложение',
  'tech_urbanization': 'Урбанизация', 'tech_advanced_masonry': 'Развитая кладка',
  'tech_fortification': 'Укрепление', 'tech_machinery': 'Механизмы',
  'tech_mercantile': 'Торговое дело', 'tech_inquisition': 'Инквизиция',
  'tech_energy_study': 'Изучение энергии', 'tech_gears': 'Шестерёнки',
  'tech_banking': 'Банковское дело', 'tech_nationalism': 'Национализм',
  'tech_sanitization': 'Санитария', 'tech_renaissance_era': 'Эпоха Ренессанса',
  'tech_composite': 'Композиты', 'tech_titanium_working': 'Обработка титана',
  'tech_communication': 'Коммуникации', 'tech_advanced_efficiency': 'Высокая эффективность',
  'tech_engineering': 'Инженерия', 'tech_replaceable_parts': 'Взаимозаменяемые детали',
  'tech_tourism': 'Туризм', 'tech_civil_service': 'Государственная служба',
  'tech_trade_networks': 'Торговые сети', 'tech_economics': 'Экономика',
  'tech_agency': 'Агентство', 'tech_politics': 'Политика',
  'tech_core_mining': 'Глубинная добыча', 'tech_radio': 'Радио',
  'tech_globalization': 'Глобализация', 'tech_industrialization': 'Индустриализация',
  'tech_world_trade': 'Мировая торговля II', 'tech_cultural_heritage': 'Культурное наследие',
  'tech_experimentation': 'Экспериментирование', 'tech_stock_market': 'Фондовый рынок',
  'tech_capitalism': 'Капитализм', 'tech_hydroponics': 'Гидропоника',
  'tech_industrial_era': 'Индустриальная Эпоха', 'tech_abyssal_composites': 'Бездонный композит',
  'tech_abyssal_working': 'Бездонная обработка', 'tech_council_of_eight': 'Совет Восьми',
  'tech_robotics': 'Робототехника', 'tech_enlightenment': 'Просвещение',
  'tech_great_pyramid': 'Великая пирамида', 'tech_great_lighthouse': 'Александрийский маяк',
  'tech_hanging_gardens': 'Висячие сады', 'tech_colossus': 'Колосс',
  'tech_grand_ship_ingermanland': 'Флагман Ингерманланд', 'tech_taj_mahal': 'Тадж-Махал',
  'tech_temple_of_artemis': 'Храм Артемиды', 'tech_statue_of_liberty': 'Статуя Свободы',
  'tech_notre_dame': 'Нотр-Дам', 'tech_colosseum': 'Колизей',
  'tech_global_stock_exchange': 'Глобальная биржа', 'tech_oxford_university': 'Оксфордский университет',
  'tech_himeji': 'Замок Химэдзи', 'tech_kremlin': 'Кремль',
  'tech_huey_teocalli': 'Уэй Теокалли', 'tech_porcelain_tower': 'Фарфоровая башня',
  'tech_angkor_wat': 'Ангкор-Ват', 'tech_great_library': 'Александрийская библиотека',
  'tech_chichen_itza': 'Чичен-Ица', 'tech_big_ben': 'Биг-Бен',
  'tech_globe_theatre': 'Глобус (Театр)', 'tech_oracle': 'Оракул',
  'tech_brandenburg_gate': 'Бранденбургские ворота',
};

const DESC_RU = {
  'tech_ancient_era': 'Открывает Политики, Разведчика, Лесоруба, Шахтёра',
  'tech_belief': 'Открывает Монумент',
  'tech_mining': 'Открывает Землечерпалку',
  'tech_agriculture': 'Открывает Ферму',
  'tech_laws': 'Открывает Банк',
  'tech_pantheon': 'Открывает Алтарь',
  'tech_classical_era': 'Открывает +2 уровня юнитов, Гражданство',
  'tech_artisanship': 'Открывает Кузницу, Мастерскую лучника, Металл Т1, Меч Т1, Эндерлук Т1',
  'tech_iron_working': 'Открывает Лук Т1, Арбалет Т1, Топор Т1, Щит Т1',
  'tech_armory': 'Открывает Казармы, Воина, Лучника, Гоплита',
  'tech_productivity': 'Открывает Шахту, Лесопилку',
  'tech_pottery': 'Открывает Зернохранилище, Коттедж',
  'tech_calendar': 'Открывает Библиотеку',
  'tech_state_workforce': 'Открывает Хутор',
  'tech_brewing': 'Открывает Алхимическую лавку',
  'tech_masonry': 'Открывает Стрелковую башню, стены, Дозорную башню, стены и Проект улучшения цивилизации',
  'tech_toolsmithing': 'Открывает Металлургию, Оружейную',
  'tech_the_wheel': 'Открывает Ветряную мельницу, Лесопилку, +20 роста на Культурную зону',
  'tech_animal_husbandry': 'Открывает Пастбище, Конюшню',
  'tech_code_of_laws': 'Открывает Деревню, +10% монет из квестов',
  'tech_construction_site': 'Открывает Карьер, уровень Землечерпалки',
  'tech_land_taxes': 'Открывает +10% дохода Коттеджа, уровень Коттеджа',
  'tech_trading': 'Открывает Торговый форпост, уровень Лесопилки',
  'tech_writing': 'Открывает уровень Банка, уровень Коттеджа',
  'tech_monarchy': 'Открывает Большую деревню, уровень Коттеджа',
  'tech_antiquity_era': 'Открывает Поселенца, +2 уровня юнитов, +1 активного Вождя, +1 слот исследования Чуда',
  'tech_steel_working': 'Открывает Лук Т2, Арбалет Т2, Топор Т2, Щит Т2',
  'tech_craftsmanship': 'Открывает Кожу Т2, Металл Т2, Меч Т2, Эндерлук Т2',
  'tech_castles': 'Открывает Стену, +10 HP к Контрольным точкам',
  'tech_military_tradition': 'Открывает Инженера, военные звания юнитов',
  'tech_deep_mining': 'Открывает уровень Карьера, уровень Шахты',
  'tech_commerce': 'Открывает уровень Пастбища, уровень Лесопилки',
  'tech_horseback_riding': 'Открывает уровень Пастбища, +20% дальности передвижения',
  'tech_minting': 'Открывает уровень Банка, +10% дохода Коттеджа',
  'tech_barter': 'Открывает уровень Банка, Рынок',
  'tech_early_empire': 'Открывает уровень Коттеджа, Склад',
  'tech_foundation': 'Улучшения тайлов начинаются на уровень выше, уровень Башни, уровень Ветряной мельницы',
  'tech_sifting': 'Открывает уровень Землечерпалки, уровень Металлургии',
  'tech_sailing': 'Открывает Верфь, Рыболовное судно',
  'tech_conservation': 'Открывает Мясную лавку',
  'tech_priesthood': 'Открывает Храм, уровень Алхимической лавки',
  'tech_guilds': 'Открывает уровень Банка, Гильдию авантюристов',
  'tech_logistic': 'Открывает уровень Храма',
  'tech_gunpowder': 'Открывает Пушечную башню, стены, уровень Лесопилки, +0.25 молота за равнину и пустыню',
  'tech_open_field_excavation': 'Открывает уровень Шахты, уровень Карьера, +15 Культуры на Культурную зону',
  'tech_aquaculture': 'Открывает уровень Алх. лавки, уровень Оружейной, уровень Ветряной мельницы, +0.25 роста за Саванну и Меса',
  'tech_baking': 'Открывает Пекарню, уровень Пастбища',
  'tech_printing_press': 'Открывает +10% скорости Культуры',
  'tech_scholarship': 'Открывает уровень Библиотеки, уровень Алхимической лавки',
  'tech_global_trade': 'Открывает +1 множитель одинаковых торговых товаров',
  'tech_feudalism': 'Открывает Город, уровень Коттеджа',
  'tech_medieval_era': 'Открывает +2 уровня юнитов, +1 активного Вождя, +1 слот Чуда, покупку Экономических ОП каждые 7 дней, смену правительства (Города-государства), скидку 15% на науку/монеты',
  'tech_carbide_working': 'Открывает Лук Т3, Арбалет Т3, Топор Т3, Щит Т3',
  'tech_chemical_bonding': 'Открывает Металл Т3, Кожу Т3, Меч Т3, Эндерлук Т3',
  'tech_philosophy': 'Открывает уровень Коттеджа, уровень Библиотеки',
  'tech_mining_guilds': 'Открывает уровень Шахты, уровень Металлургии, +10% дохода Банка',
  'tech_rationalism': 'Открывает Лабораторию, уровень Алхимической лавки',
  'tech_exploration': 'Открывает Маяк, Разведывательный корабль',
  'tech_ritual': 'Открывает уровень Храма, уровень Рынка',
  'tech_currency': 'Открывает уровень Банка, уровень Мясной лавки',
  'tech_construction': 'Открывает Большой город, уровень Рынка',
  'tech_siege_tactics': 'Открывает +1 урон по стенам, 25% стоимости разрушенного строения монетами, +0.35 науки за лесной блок',
  'tech_branch_mining': 'Открывает +15% бонус плавки, +0.5 молота за Тайгу и Тундру',
  'tech_turbines': 'Открывает уровень Ветряной мельницы, +0.25 науки за блок Океана',
  'tech_importation': 'Открывает +1 счастья за торговый товар',
  'tech_ideology': 'Открывает +0.25 науки за блок джунглей и грибов',
  'tech_compass': 'Открывает Стрелковый корабль, Пушечный корабль, уровень Оружейной',
  'tech_education': 'Открывает уровень Библиотеки, уровень Лаборатории',
  'tech_taxation': 'Открывает уровень Пастбища, уровень Рынка',
  'tech_urbanization': 'Открывает уровень Башни, уровень Коттеджа',
  'tech_advanced_masonry': 'Улучшения тайлов начинаются на уровень выше, уровень Мясной лавки',
  'tech_fortification': 'Открывает Артиллерийскую башню, уровень Шахты, уровень Оружейной',
  'tech_machinery': 'Открывает уровень Коттеджа, уровень Мясной лавки, +25% скорости Пекарен и Землечерпалок',
  'tech_mercantile': 'Открывает Таверну, +10% торгового дохода',
  'tech_inquisition': 'Открывает уровень Храма, +0.005 счастья за блок пляжа и болота',
  'tech_energy_study': 'Открывает Башню Сияния, уровень Лаборатории',
  'tech_gears': 'Открывает уровень Пекарни, +15% бонус плавки',
  'tech_banking': 'Открывает уровень Банка, +15% монет из квестов',
  'tech_nationalism': 'Открывает Мегаполис, уровень Металлургии',
  'tech_sanitization': 'Открывает Больницу, уровень Пекарни, +1 рост за блок Реки',
  'tech_renaissance_era': 'Открывает +1 активного Вождя, +2 уровня юнитов, +1 слот Чуда',
  'tech_composite': 'Металл Т4, Кожа Т4, Меч Т4, Эндерлук Т4',
  'tech_titanium_working': 'Открывает Лук Т4, Арбалет Т4, Топор Т4, Щит Т4',
  'tech_communication': 'Открывает +400 базовой Культуры, -75% таймера анархии в Городах',
  'tech_advanced_efficiency': 'Открывает уровень Библиотеки, +1 XP строениям за каждый часовой тик',
  'tech_engineering': 'Открывает уровень Башни, +10% HP строений',
  'tech_replaceable_parts': 'Открывает уровень Мясной лавки, +20 молотов и +10 науки на Культурную зону',
  'tech_tourism': 'Открывает уровень Рынка, +20% дальности на Конюшнях/Верфях',
  'tech_civil_service': 'Открывает уровень Землечерпалки, уровень Ветряной мельницы',
  'tech_trade_networks': 'Открывает +1 множитель одинаковых торговых товаров',
  'tech_economics': 'Открывает уровень Банка',
  'tech_agency': 'Открывает уровень Лаборатории, уровень Алхимической лавки',
  'tech_politics': 'Открывает Большой мегаполис, уровень Башни',
  'tech_core_mining': 'Открывает уровень Карьера, уровень Землечерпалки, уровень Шахты, уровень Металлургии',
  'tech_radio': 'Открывает +20% опыта юнитов, -10% стоимости Продвижений юнитов (Молот и Рост)',
  'tech_globalization': 'Открывает уровень Храма, +1 Культурную зону всем городам Цивилизации и ещё +1 при наличии улучшения Метрополис',
  'tech_industrialization': 'Открывает уровень Оружейной, +4 слота улучшений тайлов в каждом городе',
  'tech_world_trade': 'Открывает уровень Банка, уровни Метрополиса и Столицы',
  'tech_cultural_heritage': 'Открывает уровень Храма, +5% скорости Культуры за торговый товар',
  'tech_experimentation': 'Открывает Тайную башню, уровень Лаборатории',
  'tech_stock_market': 'Открывает уровень Банка',
  'tech_capitalism': 'Открывает +1 множитель одинаковых торговых товаров',
  'tech_hydroponics': 'Открывает уровень Пастбища, уровень Пекарни, Пастбищу требуется 750 роста вместо 1000 за бонусное яйцо',
  'tech_industrial_era': 'Открывает +1 уровень юнитов, +1 слот Чуда',
  'tech_abyssal_composites': 'Металл Т5, Кожа Т5, Меч Т5, Эндерлук Т5',
  'tech_abyssal_working': 'Открывает Лук Т5, Арбалет Т5, Топор Т5, Щит Т5',
  'tech_council_of_eight': 'Открывает Совет Восьми',
  'tech_robotics': '3 ОП за первого юнита 10 уровня; 1 ОП в неделю за каждый уникальный тип военного юнита 10 уровня',
  'tech_enlightenment': '3 ОП при завершении; 1 ОП в неделю',
  'tech_great_pyramid': 'Открывает Великую пирамиду',
  'tech_great_lighthouse': 'Открывает Александрийский маяк',
  'tech_hanging_gardens': 'Открывает Висячие сады',
  'tech_colossus': 'Открывает Колосс',
  'tech_grand_ship_ingermanland': 'Открывает Флагман Ингерманланд',
  'tech_taj_mahal': 'Открывает Тадж-Махал',
  'tech_temple_of_artemis': 'Открывает Храм Артемиды',
  'tech_statue_of_liberty': 'Открывает Статую Свободы',
  'tech_notre_dame': 'Открывает Нотр-Дам',
  'tech_colosseum': 'Открывает Колизей',
  'tech_global_stock_exchange': 'Открывает Глобальную биржу',
  'tech_oxford_university': 'Открывает Оксфордский университет',
  'tech_himeji': 'Открывает Замок Химэдзи',
  'tech_kremlin': 'Открывает Кремль',
  'tech_huey_teocalli': 'Открывает Уэй Теокалли',
  'tech_porcelain_tower': 'Открывает Фарфоровую башню',
  'tech_angkor_wat': 'Открывает Ангкор-Ват',
  'tech_great_library': 'Открывает Александрийскую библиотеку',
  'tech_chichen_itza': 'Открывает Чичен-Ицу',
  'tech_big_ben': 'Открывает Биг-Бен',
  'tech_globe_theatre': 'Открывает Глобус (Театр)',
  'tech_oracle': 'Открывает Оракул',
  'tech_brandenburg_gate': 'Открывает Бранденбургские ворота',
};

// Layout columns
const LAYOUT = [
  ['tech_ancient_era'],
  ['tech_belief'],
  ['tech_mining', 'tech_agriculture', 'tech_laws', 'tech_pantheon'],
  ['tech_classical_era'],
  ['tech_artisanship', 'tech_iron_working', 'tech_armory', 'tech_productivity', 'tech_pottery', 'tech_calendar', 'tech_state_workforce', 'tech_brewing'],
  ['tech_masonry', 'tech_toolsmithing', 'tech_the_wheel', 'tech_animal_husbandry', 'tech_code_of_laws'],
  ['tech_construction_site', 'tech_land_taxes', 'tech_trading', 'tech_writing', 'tech_monarchy'],
  ['tech_antiquity_era'],
  ['tech_steel_working', 'tech_craftsmanship', 'tech_castles', 'tech_military_tradition', 'tech_deep_mining', 'tech_commerce', 'tech_horseback_riding', 'tech_minting', 'tech_barter', 'tech_early_empire'],
  ['tech_foundation', 'tech_sifting', 'tech_sailing', 'tech_conservation', 'tech_priesthood', 'tech_guilds'],
  ['tech_logistic', 'tech_gunpowder', 'tech_open_field_excavation', 'tech_aquaculture', 'tech_baking', 'tech_printing_press', 'tech_scholarship', 'tech_global_trade', 'tech_feudalism'],
  ['tech_medieval_era'],
  ['tech_carbide_working', 'tech_chemical_bonding', 'tech_philosophy', 'tech_mining_guilds', 'tech_rationalism', 'tech_exploration', 'tech_ritual', 'tech_currency', 'tech_construction'],
  ['tech_siege_tactics', 'tech_branch_mining', 'tech_turbines', 'tech_importation', 'tech_ideology', 'tech_compass', 'tech_education', 'tech_taxation', 'tech_urbanization', 'tech_advanced_masonry'],
  ['tech_fortification', 'tech_machinery', 'tech_mercantile', 'tech_inquisition', 'tech_energy_study', 'tech_gears', 'tech_banking', 'tech_nationalism', 'tech_sanitization'],
  ['tech_renaissance_era'],
  ['tech_composite', 'tech_titanium_working', 'tech_communication', 'tech_advanced_efficiency', 'tech_engineering', 'tech_replaceable_parts', 'tech_tourism', 'tech_civil_service', 'tech_trade_networks', 'tech_economics', 'tech_agency', 'tech_politics', 'tech_core_mining'],
  ['tech_radio', 'tech_globalization', 'tech_industrialization', 'tech_world_trade', 'tech_cultural_heritage', 'tech_experimentation', 'tech_stock_market', 'tech_capitalism', 'tech_hydroponics'],
  ['tech_industrial_era'],
  ['tech_abyssal_composites', 'tech_abyssal_working', 'tech_council_of_eight'],
  ['tech_robotics', 'tech_enlightenment'],
];

const NW = 148, NH = 96, CG = 44, RG = 20;
const WCOLS = 3;

// Build techMap
const techMap = {};
TECHS.forEach(t => techMap[t.id] = t);
WONDERS.forEach(w => techMap[w.id] = { ...w, era: 0, wonder: true, cost: 75000, req: null });

let lang = 'en';
let zoom = 1, panX = 20, panY = 20;
let selectedId = null;
const checkedIds = new Set();
let viewMode = 'all';
let searchQuery = '';

function fmtN(n) {
  if (!n) return '0';
  return n.toLocaleString('en-US').replace(/,/g, ' ');
}

function fmtExact(n) {
  if (!n) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(3).replace(/\.?0+$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(2).replace(/\.?0+$/, '') + 'K';
  return String(n);
}

function parseReqs(s) { return s ? s.split(/[\/:]/).filter(Boolean) : []; }
function isOrStr(s) { return s && s.includes('/'); }
function getName(t) { return lang === 'ru' && NAMES_RU[t.id] ? NAMES_RU[t.id] : t.name; }
function getDesc(t) { return lang === 'ru' && DESC_RU[t.id] ? DESC_RU[t.id] : t.desc || ''; }
function tr(k) { return I18N[lang][k] || k; }

// ── Build positions ───────────────────────────
let positions = {};

function buildPositions() {
  positions = {};
  let maxRows = 0;
  LAYOUT.forEach(col => { if (col.length > maxRows) maxRows = col.length; });
  const maxColH = maxRows * (NH + RG) - RG;

  let cx = 20;
  LAYOUT.forEach(col => {
    const colH = col.length * (NH + RG) - RG;
    const startY = 20 + Math.round((maxColH - colH) / 2);
    col.forEach((id, i) => {
      positions[id] = { x: cx, y: startY + i * (NH + RG), w: NW, h: NH };
    });
    cx += NW + CG;
  });

  cx += 10;
  const wRows = Math.ceil(WONDERS.length / WCOLS);
  const wColH = wRows * (NH + RG) - RG;
  const wStartY = 20 + Math.round((maxColH - wColH) / 2);
  WONDERS.forEach((w, i) => {
    const col = i % WCOLS;
    const row = Math.floor(i / WCOLS);
    positions[w.id] = { x: cx + col * (NW + CG / 2), y: wStartY + row * (NH + RG), w: NW, h: NH };
  });
}

// ── Render ────────────────────────────────────
function render() {
  buildPositions();
  const world = document.getElementById('world');
  Array.from(world.children).forEach(c => { if (c.id !== 'svg-layer') c.remove(); });

  let maxX = 0, maxY = 0;
  Object.values(positions).forEach(p => {
    if (p.x + p.w > maxX) maxX = p.x + p.w;
    if (p.y + p.h > maxY) maxY = p.y + p.h;
  });
  maxX += 20; maxY += 20;

  const svg = document.getElementById('svg-layer');
  svg.style.width = maxX + 'px';
  svg.style.height = maxY + 'px';
  svg.setAttribute('width', maxX);
  svg.setAttribute('height', maxY);
  svg.innerHTML = `<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>`;

  const drawn = new Set();
  TECHS.forEach(tech => {
    if (!tech.req) return;
    const toPos = positions[tech.id];
    if (!toPos) return;
    const isOr = isOrStr(tech.req);
    parseReqs(tech.req).forEach(reqId => {
      const fromPos = positions[reqId];
      if (!fromPos) return;
      const key = reqId + '->' + tech.id;
      if (drawn.has(key)) return;
      drawn.add(key);
      const fromT = techMap[reqId];
      const col = ERA_COLORS[fromT ? fromT.era : 1] || '#888';
      const x1 = fromPos.x + fromPos.w, y1 = fromPos.y + fromPos.h / 2;
      const x2 = toPos.x, y2 = toPos.y + toPos.h / 2;
      const mx = (x1 + x2) / 2;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', col);
      path.setAttribute('stroke-width', isOr ? '1' : '1.8');
      path.setAttribute('stroke-opacity', isOr ? '0.35' : '0.5');
      if (isOr) path.setAttribute('stroke-dasharray', '5 4');
      path.setAttribute('marker-end', 'url(#arr)');
      path.classList.add('edge-path');
      path.dataset.from = reqId;
      path.dataset.to = tech.id;
      svg.appendChild(path);
    });
  });

  TECHS.forEach(tech => {
    const pos = positions[tech.id];
    if (!pos) return;
    world.appendChild(makeNode(tech, pos));
  });

  const wFirst = positions[WONDERS[0].id];
  if (wFirst) {
    const wTotalW = WCOLS * NW + (WCOLS - 1) * CG / 2;
    const lbl = document.createElement('div');
    lbl.style.cssText = `position:absolute;left:${wFirst.x}px;top:${wFirst.y - 20}px;width:${wTotalW}px;font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--wonder);opacity:0.7;text-align:center;`;
    lbl.textContent = '✦ ' + tr('eraW') + ' ✦';
    world.appendChild(lbl);
  }

  WONDERS.forEach(w => {
    const pos = positions[w.id];
    if (!pos) return;
    world.appendChild(makeNode({ ...w, era: 0, wonder: true }, pos));
  });

  applyHighlight();
  applyViewFilter();
  applyQueueOverlay();
  if (searchQuery) applySearchFilter();
}

function makeNode(tech, pos) {
  const div = document.createElement('div');
  const isChecked = checkedIds.has(tech.id);
  div.className = 'tech-node era-' + (tech.era || 0)
      + (tech.unlock_era ? ' era-unlock' : '')
      + (tech.wonder ? ' wonder-node' : '')
      + (isChecked ? ' node-checked' : '');
  div.style.left = pos.x + 'px';
  div.style.top = pos.y + 'px';
  div.style.width = pos.w + 'px';
  div.style.minHeight = pos.h + 'px';
  div.dataset.id = tech.id;

  const chk = document.createElement('div');
  chk.className = 'node-check' + (isChecked ? ' checked' : '');
  chk.title = isChecked ? 'Uncheck' : 'Check';
  chk.addEventListener('click', e => { e.stopPropagation(); toggleCheck(tech.id); });
  div.appendChild(chk);

  const badge = document.createElement('div');
  badge.className = 'node-era-badge';
  badge.textContent = tech.wonder ? tr('wonder') : tech.unlock_era ? tr('eraUnlock') : (tr('era' + tech.era) || '');
  div.appendChild(badge);

  const name = document.createElement('div');
  name.className = 'node-name';
  name.style.paddingRight = '20px';
  name.textContent = getName(tech);
  div.appendChild(name);

  const desc = document.createElement('div');
  desc.className = 'node-desc';
  desc.textContent = getDesc(tech);
  div.appendChild(desc);

  const costs = document.createElement('div');
  costs.className = 'node-costs';
  costs.innerHTML = `<span class="node-cost">🔬 ${fmtN(tech.bc)}</span>${tech.cost ? `<span class="node-cost">💰 ${fmtN(tech.cost)}</span>` : ''}`;
  div.appendChild(costs);

  div.addEventListener('click', e => { e.stopPropagation(); selectTech(tech.id); });
  return div;
}

// ── Search ────────────────────────────────────
function onSearchInput() {
  const input = document.getElementById('search-input');
  searchQuery = input.value.trim().toLowerCase();
  const clearBtn = document.getElementById('search-clear');
  clearBtn.classList.toggle('visible', searchQuery.length > 0);
  input.classList.toggle('active', searchQuery.length > 0);
  applySearchFilter();
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  searchQuery = '';
  document.getElementById('search-clear').classList.remove('visible');
  document.getElementById('search-input').classList.remove('active');
  applySearchFilter();
}

function applySearchFilter() {
  const world = document.getElementById('world');
  const svg = document.getElementById('svg-layer');

  if (!searchQuery) {
    applyHighlight();
    return;
  }

  world.querySelectorAll('.tech-node').forEach(el => {
    const id = el.dataset.id;
    const tech = techMap[id];
    if (!tech) return;
    const nameStr = getName(tech).toLowerCase();
    const descStr = getDesc(tech).toLowerCase();
    const matches = nameStr.includes(searchQuery) || descStr.includes(searchQuery);
    el.classList.remove('node-selected', 'node-path');
    el.classList.toggle('node-faded', !matches);
  });

  svg.querySelectorAll('.edge-path').forEach(el => {
    el.classList.add('edge-faded');
    el.classList.remove('edge-active');
  });
}

// ── Chain cost calculation ────────────────────
function calcChainCost(id) {
  const chain = getFullCostChain(id);
  let totalBc = 0, totalCost = 0, skippedBc = 0, skippedCost = 0, skippedCount = 0;
  chain.forEach(tid => {
    const t = techMap[tid];
    if (!t) return;
    if (checkedIds.has(tid)) {
      skippedBc += (t.bc || 0);
      skippedCost += (t.cost || 0);
      skippedCount++;
    } else {
      totalBc += (t.bc || 0);
      totalCost += (t.cost || 0);
    }
  });
  return { bc: totalBc, cost: totalCost, skippedBc, skippedCost, chainSize: chain.size, skippedCount };
}

function updateChainCostPanel(id) {
  const t = I18N[lang];
  document.getElementById('lbl-chain').textContent = t.chainCost;
  document.getElementById('lbl-chain-remaining').textContent = t.chainRemaining;

  const { bc, cost, skippedBc, skippedCost, chainSize, skippedCount } = calcChainCost(id);
  const townMult = 1 + cityTowns * 0.1;
  const effectiveBc = Math.round(bc * townMult);

  document.getElementById('chain-bc-value').textContent = fmtExact(effectiveBc)
      + (cityTowns > 0 ? ` ×${townMult.toFixed(1)}` : '');
  document.getElementById('chain-cost-value').textContent = fmtExact(cost);

  const bcSkipEl = document.getElementById('chain-bc-skipped');
  const costSkipEl = document.getElementById('chain-cost-skipped');
  if (skippedCount > 0) {
    bcSkipEl.textContent = `−${fmtExact(Math.round(skippedBc * townMult))} ${t.chainSkippedBc}`;
    bcSkipEl.style.color = '#c0392b';
    costSkipEl.textContent = `−${fmtExact(skippedCost)} ${t.chainSkippedCost}`;
    costSkipEl.style.color = '#c0392b';
  } else {
    bcSkipEl.textContent = '';
    costSkipEl.textContent = '';
  }

  const timeEl = document.getElementById('panel-research-time');
  const timeVal = document.getElementById('panel-time-value');
  const timeLabel = document.getElementById('lbl-time-label');
  const timeStr = calcResearchTime(effectiveBc);
  if (timeStr) {
    timeEl.style.display = '';
    timeVal.textContent = timeStr;
    timeLabel.textContent = t.researchTime;
  } else {
    timeEl.style.display = 'none';
  }

  document.getElementById('panel-chain-section').style.display = chainSize > 0 ? '' : 'none';
}

function getRequiredChain(id, visited = new Set()) {
  if (visited.has(id)) return visited;
  visited.add(id);
  const t = techMap[id];
  if (!t || !t.req) return visited;
  if (t.req.includes('/')) {
    const best = pickBestBranch(t.req.split('/').filter(Boolean));
    if (best) getRequiredChain(best, visited);
    return visited;
  }
  t.req.split(':').filter(Boolean).forEach(reqId => getRequiredChain(reqId, visited));
  return visited;
}

function scoreBranch(id, available) {
  const all = new Set();
  collectAndChain(id, all);
  let checked = 0, unchecked = 0;
  all.forEach(tid => {
    if (checkedIds.has(tid) || (available && available.has(tid))) checked++;
    else unchecked++;
  });
  return { checked, unchecked, total: all.size };
}

function pickBestBranch(branches, available) {
  for (const branchId of branches) {
    if (checkedIds.has(branchId) || (available && available.has(branchId))) return branchId;
  }
  let best = null, bestScore = null;
  branches.forEach(branchId => {
    const s = scoreBranch(branchId, available);
    if (!bestScore || s.checked > bestScore.checked || (s.checked === bestScore.checked && s.unchecked < bestScore.unchecked)) {
      best = branchId;
      bestScore = s;
    }
  });
  return best;
}

function getFullCostChain(id, visited = new Set()) {
  if (visited.has(id)) return visited;
  visited.add(id);
  const t = techMap[id];
  if (!t || !t.req) return visited;
  if (t.req.includes('/')) {
    const best = pickBestBranch(t.req.split('/').filter(Boolean));
    if (best) getFullCostChain(best, visited);
    return visited;
  }
  t.req.split(':').filter(Boolean).forEach(reqId => getFullCostChain(reqId, visited));
  return visited;
}

function collectAndChain(id, visited) {
  if (visited.has(id)) return;
  visited.add(id);
  const t = techMap[id];
  if (!t || !t.req) return;
  if (t.req.includes('/')) {
    t.req.split('/').filter(Boolean).forEach(rid => collectAndChain(rid, visited));
  } else {
    t.req.split(':').filter(Boolean).forEach(rid => collectAndChain(rid, visited));
  }
}

function applyHighlight() {
  if (searchQuery) { applySearchFilter(); return; }

  const world = document.getElementById('world');
  const svg = document.getElementById('svg-layer');
  if (!selectedId) {
    world.querySelectorAll('.tech-node').forEach(el => el.classList.remove('node-selected', 'node-path', 'node-faded'));
    svg.querySelectorAll('.edge-path').forEach(el => el.classList.remove('edge-active', 'edge-faded'));
    return;
  }
  const chain = getRequiredChain(selectedId);
  world.querySelectorAll('.tech-node').forEach(el => {
    const id = el.dataset.id;
    el.classList.remove('node-selected', 'node-path', 'node-faded');
    if (id === selectedId) el.classList.add('node-selected');
    else if (chain.has(id)) el.classList.add('node-path');
    else el.classList.add('node-faded');
  });
  svg.querySelectorAll('.edge-path').forEach(el => {
    el.classList.remove('edge-active', 'edge-faded');
    const inChain = chain.has(el.dataset.to) && chain.has(el.dataset.from);
    if (inChain) el.classList.add('edge-active');
    else el.classList.add('edge-faded');
  });
}

// ── Research Queue ────────────────────────────
const researchQueue = [];

function toggleQueuePanel() {
  document.getElementById('queue-panel').classList.toggle('open');
}

function validateQueueable(id, available) {
  const tech = techMap[id];
  if (!tech || !tech.req) return null;
  if (tech.req.includes('/')) {
    const branches = tech.req.split('/').filter(Boolean);
    const anyReady = branches.some(branchId => checkedIds.has(branchId) || available.has(branchId));
    if (!anyReady) {
      return branches.map(branchId => { const bt = techMap[branchId]; return bt ? getName(bt) : branchId; }).join(' / ');
    }
    return null;
  }
  const deps = tech.req.split(':').filter(Boolean);
  for (const depId of deps) {
    if (!checkedIds.has(depId) && !available.has(depId)) {
      const depTech = techMap[depId];
      return depTech ? getName(depTech) : depId;
    }
  }
  return null;
}

function buildResearchOrder(targetId) {
  const available = new Set(checkedIds);
  researchQueue.forEach(id => available.add(id));
  const toProcess = [];
  const visited = new Set();

  function collect(id) {
    if (visited.has(id)) return;
    visited.add(id);
    if (checkedIds.has(id) || available.has(id)) return;
    const tech = techMap[id];
    if (!tech) return;
    if (tech.req) {
      if (tech.req.includes('/')) {
        const branches = tech.req.split('/').filter(Boolean);
        const satisfied = branches.find(branchId => checkedIds.has(branchId) || available.has(branchId));
        if (!satisfied) {
          const best = pickBestBranch(branches, available);
          if (best) collect(best);
        }
      } else {
        tech.req.split(':').filter(Boolean).forEach(depId => collect(depId));
      }
    }
    toProcess.push(id);
    available.add(id);
  }

  collect(targetId);

  const validateSet = new Set(checkedIds);
  researchQueue.forEach(id => validateSet.add(id));
  for (const id of toProcess) {
    const missing = validateQueueable(id, validateSet);
    if (missing) {
      const techName = getName(techMap[id] || { name: id });
      return { order: [], error: `"${techName}" — ${I18N[lang].queueError} "${missing}"` };
    }
    validateSet.add(id);
  }
  return { order: toProcess, error: null };
}

function toggleQueueItem() {
  if (!selectedId) return;
  const idx = researchQueue.indexOf(selectedId);
  if (idx !== -1) {
    removeFromQueueWithDependents(selectedId);
  } else {
    const { order, error } = buildResearchOrder(selectedId);
    if (error) { showQueueError(error); return; }
    order.forEach(id => { if (!researchQueue.includes(id)) researchQueue.push(id); });
  }
  renderQueue();
  updatePanelQueueBtn();
  saveState();
}

function removeFromQueueWithDependents(id) {
  const idxToRemove = new Set([id]);
  for (let i = 0; i < researchQueue.length; i++) {
    const qId = researchQueue[i];
    if (idxToRemove.has(qId)) continue;
    const tech = techMap[qId];
    if (!tech || !tech.req) continue;
    const deps = tech.req.includes('/') ? tech.req.split('/') : tech.req.split(':');
    if (deps.some(depId => idxToRemove.has(depId))) idxToRemove.add(qId);
  }
  idxToRemove.forEach(removeId => {
    const i = researchQueue.indexOf(removeId);
    if (i !== -1) researchQueue.splice(i, 1);
  });
}

function removeQueueItem(id) {
  removeFromQueueWithDependents(id);
  renderQueue();
  updatePanelQueueBtn();
  saveState();
}

function clearQueue() {
  researchQueue.length = 0;
  applyQueueOverlay();
  renderQueue();
  updatePanelQueueBtn();
  saveState();
}

function showQueueError(message) {
  const el = document.getElementById('queue-error');
  el.innerHTML = `<div class="queue-error">⚠ ${message}</div>`;
  setTimeout(() => { el.innerHTML = ''; }, 4000);
  document.getElementById('queue-panel').classList.add('open');
}

function renderQueue() {
  const t = I18N[lang];
  document.getElementById('lbl-queue-title').textContent = t.queueTitle;
  document.getElementById('lbl-queue-clear').textContent = t.queueClear;

  const listEl = document.getElementById('queue-list');
  listEl.innerHTML = '';

  if (researchQueue.length === 0) {
    listEl.innerHTML = `<div class="queue-empty">${t.queueEmpty}</div>`;
    document.getElementById('queue-total').innerHTML = '';
    document.getElementById('queue-toggle-btn').classList.remove('has-queue');
    document.getElementById('queue-toggle-btn').textContent = '📋 Queue';
    return;
  }

  document.getElementById('queue-toggle-btn').classList.add('has-queue');
  document.getElementById('queue-toggle-btn').textContent = `📋 Queue (${researchQueue.length})`;

  let totalBc = 0, totalCost = 0;
  const townMult = 1 + cityTowns * 0.1;

  researchQueue.forEach((id, index) => {
    const tech = techMap[id];
    if (!tech) return;
    totalBc += (tech.bc || 0);
    totalCost += (tech.cost || 0);
    const item = document.createElement('div');
    item.className = 'queue-item';
    const col = ERA_COLORS[tech.era] || '#888';
    item.innerHTML = `
      <span class="queue-item-num">${index + 1}</span>
      <div class="queue-item-dot" style="background:${col}"></div>
      <span class="queue-item-name">${getName(tech)}</span>
      <button class="queue-item-remove" onclick="removeQueueItem('${id}')" title="Remove">✕</button>`;
    listEl.appendChild(item);
  });

  const effectiveBc = Math.round(totalBc * townMult);
  const timeStr = calcResearchTime(effectiveBc);
  const totalEl = document.getElementById('queue-total');
  totalEl.innerHTML = `
    <div>${t.queueTotal} <span>🔬 ${fmtExact(effectiveBc)}${cityTowns > 0 ? ` ×${townMult.toFixed(1)}` : ''}</span> &nbsp; <span>💰 ${fmtExact(totalCost)}</span></div>
    ${timeStr ? `<div>⏱ <span>${timeStr}</span></div>` : ''}`;

  applyQueueOverlay();
}

function applyQueueOverlay() {
  const world = document.getElementById('world');
  world.querySelectorAll('.queue-badge').forEach(el => el.remove());
  world.querySelectorAll('.tech-node.node-queued').forEach(el => el.classList.remove('node-queued'));
  researchQueue.forEach((id, index) => {
    const el = world.querySelector(`.tech-node[data-id="${id}"]`);
    if (!el) return;
    el.classList.add('node-queued');
    const badge = document.createElement('div');
    badge.className = 'queue-badge';
    badge.textContent = index + 1;
    el.appendChild(badge);
  });
}

function exportQueue(format) {
  if (researchQueue.length === 0) return;
  const t = I18N[lang];
  const townMult = 1 + cityTowns * 0.1;
  let totalBc = 0, totalCost = 0;

  const rows = researchQueue.map((id, i) => {
    const tech = techMap[id];
    if (!tech) return null;
    const bc = Math.round((tech.bc || 0) * townMult);
    totalBc += bc;
    totalCost += (tech.cost || 0);
    const nextTech = researchQueue[i + 1] ? techMap[researchQueue[i + 1]] : null;
    return { num: i + 1, name: getName(tech), desc: getDesc(tech), nextName: nextTech ? getName(nextTech) : null };
  }).filter(Boolean);

  const timeStr = calcResearchTime(Math.round(totalBc));
  const header = `Research Queue — ${new Date().toLocaleDateString()}`;
  let text = '';

  if (format === 'txt') {
    text += header + '\n' + '='.repeat(header.length) + '\n\n';
    rows.forEach(r => {
      const arrow = r.nextName ? ` => ${r.nextName}` : '';
      text += `${r.name}${arrow}\n`;
      if (r.desc) text += `  (${r.desc})\n`;
    });
    text += '\n' + '-'.repeat(40) + '\n';
    text += `Total: 🔬 ${fmtExact(Math.round(totalBc))}  💰 ${fmtExact(totalCost)}`;
    if (timeStr) text += `  ⏱ ${timeStr}`;
    downloadText(text, 'research-queue.txt', 'text/plain');
  } else if (format === 'md') {
    text += `# ${header}\n\n`;
    rows.forEach(r => {
      const arrow = r.nextName ? ` => ${r.nextName}` : '';
      text += `- **${r.name}**${arrow}`;
      if (r.desc) text += ` *(${r.desc})*`;
      text += '\n';
    });
    text += `\n**Total:** 🔬 ${fmtExact(Math.round(totalBc))}  💰 ${fmtExact(totalCost)}`;
    if (timeStr) text += `  ⏱ ${timeStr}`;
    if (cityTowns > 0) text += `\n\n*Beakers include ×${townMult.toFixed(1)} town modifier (${cityTowns} towns)*`;
    downloadText(text, 'research-queue.md', 'text/markdown');
  } else if (format === 'copy') {
    rows.forEach(r => {
      const arrow = r.nextName ? ` => ${r.nextName}` : '';
      text += `${r.name}${arrow}`;
      if (r.desc) text += ` (${r.desc})`;
      text += '\n';
    });
    text += `\nTotal: 🔬 ${fmtExact(Math.round(totalBc))} / 💰 ${fmtExact(totalCost)}`;
    if (timeStr) text += ` / ⏱ ${timeStr}`;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector('.export-btn[onclick*="copy"]');
      if (btn) { const orig = btn.textContent; btn.textContent = '✓ Copied!'; setTimeout(() => btn.textContent = orig, 1500); }
    }).catch(() => {});
  }
}

function downloadText(text, filename, mime) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function updatePanelQueueBtn() {
  const btn = document.getElementById('panel-queue-btn');
  if (!btn || !selectedId) return;
  const t = I18N[lang];
  const inQueue = researchQueue.includes(selectedId);
  btn.textContent = inQueue ? t.queueRemove : t.queueAdd;
  btn.classList.toggle('in-queue', inQueue);
}

// ── localStorage persistence ──────────────────
const LS_KEY = 'techtree_state';
let cityBeakers = 0;
let cityTowns = 0;

function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      checked: [...checkedIds], viewMode, lang, zoom, panX, panY,
      cityBeakers, cityTowns, queue: [...researchQueue],
    }));
  } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (Array.isArray(s.checked)) s.checked.forEach(id => checkedIds.add(id));
    if (s.viewMode) viewMode = s.viewMode;
    if (s.lang) lang = s.lang;
    if (typeof s.zoom === 'number') zoom = s.zoom;
    if (typeof s.panX === 'number') panX = s.panX;
    if (typeof s.panY === 'number') panY = s.panY;
    if (typeof s.cityBeakers === 'number') cityBeakers = s.cityBeakers;
    if (typeof s.cityTowns === 'number') cityTowns = s.cityTowns;
    if (Array.isArray(s.queue)) { researchQueue.length = 0; s.queue.forEach(id => researchQueue.push(id)); }
  } catch (e) {}
}

function toggleCheck(id) {
  if (checkedIds.has(id)) checkedIds.delete(id);
  else checkedIds.add(id);
  const world = document.getElementById('world');
  const el = world.querySelector(`.tech-node[data-id="${id}"]`);
  if (el) {
    const isChecked = checkedIds.has(id);
    el.classList.toggle('node-checked', isChecked);
    const chk = el.querySelector('.node-check');
    if (chk) { chk.classList.toggle('checked', isChecked); chk.title = isChecked ? 'Uncheck' : 'Check'; }
    applyViewFilter();
  }
  saveState();
  if (selectedId) updateChainCostPanel(selectedId);
}

function setView(mode) {
  viewMode = mode;
  ['all', 'done', 'undone'].forEach(m => {
    document.getElementById('vbtn-' + m).classList.toggle('active', m === mode);
  });
  updateViewBtnLabels();
  applyViewFilter();
  saveState();
}

function updateViewBtnLabels() {
  const t = I18N[lang];
  document.getElementById('vbtn-all').textContent = t.viewAll;
  document.getElementById('vbtn-done').textContent = t.viewDone;
  document.getElementById('vbtn-undone').textContent = t.viewUndone;
}

function applyViewFilter() {
  const world = document.getElementById('world');
  world.querySelectorAll('.tech-node').forEach(el => {
    const id = el.dataset.id;
    const isChecked = checkedIds.has(id);
    let hidden = false;
    if (viewMode === 'done' && !isChecked) hidden = true;
    if (viewMode === 'undone' && isChecked) hidden = true;
    el.classList.toggle('node-hidden', hidden);
  });
}

function selectTech(id) {
  selectedId = id;
  applyHighlight();
  openPanel(id);
}

function openPanel(id) {
  const tech = techMap[id];
  if (!tech) return;
  const col = ERA_COLORS[tech.era] || '#888';
  const t = I18N[lang];
  document.getElementById('panel-stripe').style.background = col;
  document.getElementById('panel-era-label').style.color = col;
  document.getElementById('panel-era-label').textContent = tech.wonder ? t.wonder : tech.unlock_era ? t.eraUnlock : (t['era' + tech.era] || '');
  document.getElementById('panel-title').textContent = getName(tech);
  document.getElementById('panel-desc').textContent = getDesc(tech);
  document.getElementById('lbl-unlocks').textContent = t.unlocks;
  document.getElementById('lbl-requires').textContent = t.requires;
  document.getElementById('leg-req').textContent = t.legReq;
  document.getElementById('leg-or').textContent = t.legOr;
  document.getElementById('panel-costs').innerHTML = `
    <div class="panel-cost-item"><div class="panel-cost-label">${t.labelBeaker}</div><div class="panel-cost-value">🔬 ${fmtExact(tech.bc)}</div></div>
    <div class="panel-cost-item"><div class="panel-cost-label">${t.labelCost}</div><div class="panel-cost-value">💰 ${fmtExact(tech.cost || 0)}</div></div>`;

  const reqsEl = document.getElementById('panel-reqs');
  reqsEl.innerHTML = '';
  const section = document.getElementById('panel-reqs-section');
  if (tech.req) {
    section.style.display = '';
    const isOr = isOrStr(tech.req);
    parseReqs(tech.req).forEach(reqId => {
      const rt = techMap[reqId];
      if (!rt) return;
      const item = document.createElement('div');
      item.className = 'req-item';
      item.innerHTML = `<div class="req-dot" style="background:${ERA_COLORS[rt.era] || '#888'}"></div><span>${getName(rt)}</span><span class="req-type">${isOr ? t.orReq : t.andReq}</span>`;
      item.onclick = () => selectTech(reqId);
      reqsEl.appendChild(item);
    });
  } else {
    section.style.display = 'none';
  }

  document.getElementById('detail-panel').classList.add('open');
  updateChainCostPanel(id);
  updatePanelQueueBtn();
}

function closePanel() {
  selectedId = null;
  applyHighlight();
  document.getElementById('detail-panel').classList.remove('open');
}

document.getElementById('viewport').addEventListener('click', () => closePanel());

// ── City modal ────────────────────────────────
function toggleCityModal() {
  const overlay = document.getElementById('city-modal-overlay');
  if (overlay.classList.contains('open')) { closeCityModal(); } else { openCityModal(); }
}

function openCityModal() {
  const t = I18N[lang];
  document.getElementById('lbl-city-title').textContent = t.cityTitle;
  document.getElementById('lbl-city-beakers').textContent = t.cityBeakers;
  document.getElementById('lbl-city-beakers-hint').textContent = t.cityBeakersHint;
  document.getElementById('lbl-city-towns').textContent = t.cityTowns;
  document.getElementById('lbl-city-towns-hint').textContent = t.cityTownsHint;
  document.getElementById('city-beakers').value = cityBeakers || '';
  document.getElementById('city-towns').value = cityTowns || '';
  const overlay = document.getElementById('city-modal-overlay');
  overlay.classList.add('open');
  const btn = document.getElementById('city-btn');
  const rect = btn.getBoundingClientRect();
  const modal = document.getElementById('city-modal');
  modal.style.top = (rect.bottom + 6) + 'px';
  modal.style.left = rect.left + 'px';
}

function closeCityModal() {
  document.getElementById('city-modal-overlay').classList.remove('open');
}

function onCityOverlayClick(e) {
  if (e.target === document.getElementById('city-modal-overlay')) closeCityModal();
}

function onCityInput() {
  cityBeakers = Math.max(0, parseInt(document.getElementById('city-beakers').value) || 0);
  cityTowns = Math.max(0, parseInt(document.getElementById('city-towns').value) || 0);
  updateCityBtn();
  saveState();
  if (selectedId) updateChainCostPanel(selectedId);
}

function updateCityBtn() {
  const btn = document.getElementById('city-btn');
  const hasVals = cityBeakers > 0 || cityTowns > 0;
  btn.classList.toggle('has-values', hasVals);
  btn.textContent = hasVals ? `⚙ 🔬${fmtN(cityBeakers)}  🏘${cityTowns}` : '⚙ City';
}

function calcResearchTime(beakerCost) {
  if (cityBeakers <= 0 || beakerCost <= 0) return null;
  const hours = beakerCost / cityBeakers;
  const totalMin = Math.round(hours * 60);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function setLang(l) {
  lang = l;
  document.getElementById('btn-en').classList.toggle('active', l === 'en');
  document.getElementById('btn-ru').classList.toggle('active', l === 'ru');
  document.getElementById('search-input').placeholder = I18N[l].searchPlaceholder;
  updateViewBtnLabels();
  render();
  if (selectedId) openPanel(selectedId);
  renderQueue();
  saveState();
}

// ── Pan + zoom ────────────────────────────────
function applyTransform() {
  document.getElementById('world').style.transform = `translate(${panX}px,${panY}px) scale(${zoom})`;
  document.getElementById('zoom-label').textContent = Math.round(zoom * 100) + '%';
}

function zoomAt(newZoom, ox, oy) {
  newZoom = Math.max(0.15, Math.min(3, newZoom));
  const worldX = (ox - panX) / zoom;
  const worldY = (oy - panY) / zoom;
  zoom = newZoom;
  panX = ox - worldX * zoom;
  panY = oy - worldY * zoom;
  applyTransform();
}

function zoomBy(delta) {
  const vp = document.getElementById('viewport');
  zoomAt(zoom + delta, vp.clientWidth / 2, vp.clientHeight / 2);
  saveState();
}

function resetView() { zoom = 1; panX = 20; panY = 20; applyTransform(); saveState(); }

let isPanning = false, didPan = false;
let px0 = 0, py0 = 0, panX0 = 0, panY0 = 0;

const vp = document.getElementById('viewport');
vp.addEventListener('mousedown', e => {
  if (e.button !== 0) return;
  isPanning = true; didPan = false;
  px0 = e.clientX; py0 = e.clientY;
  panX0 = panX; panY0 = panY;
  vp.classList.add('panning');
});
window.addEventListener('mousemove', e => {
  if (!isPanning) return;
  const dx = e.clientX - px0, dy = e.clientY - py0;
  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didPan = true;
  panX = panX0 + dx; panY = panY0 + dy;
  applyTransform();
});
window.addEventListener('mouseup', () => {
  if (!isPanning) return;
  isPanning = false;
  vp.classList.remove('panning');
  if (didPan) saveState();
});
vp.addEventListener('click', e => {
  if (didPan) { e.stopPropagation(); didPan = false; }
}, true);

let _saveTimer = null;
vp.addEventListener('wheel', e => {
  e.preventDefault();
  const rect = vp.getBoundingClientRect();
  const ox = e.clientX - rect.left;
  const oy = e.clientY - rect.top;
  const delta = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
  zoomAt(zoom * Math.pow(0.999, delta), ox, oy);
  if (isPanning) { px0 = e.clientX; py0 = e.clientY; panX0 = panX; panY0 = panY; }
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(saveState, 400);
}, { passive: false });

let touchState = {}, lastPinchD = null, touchPanX0 = 0, touchPanY0 = 0, touchPX0 = 0, touchPY0 = 0;
vp.addEventListener('touchstart', e => {
  e.preventDefault();
  Array.from(e.changedTouches).forEach(t => touchState[t.identifier] = [t.clientX, t.clientY]);
  const pts = Object.values(touchState);
  if (pts.length === 1) { touchPX0 = pts[0][0]; touchPY0 = pts[0][1]; touchPanX0 = panX; touchPanY0 = panY; lastPinchD = null; }
  else if (pts.length === 2) { lastPinchD = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]); }
}, { passive: false });
vp.addEventListener('touchmove', e => {
  e.preventDefault();
  Array.from(e.changedTouches).forEach(t => { if (touchState[t.identifier]) touchState[t.identifier] = [t.clientX, t.clientY]; });
  const pts = Object.values(touchState);
  if (pts.length === 1) { panX = touchPanX0 + (pts[0][0] - touchPX0); panY = touchPanY0 + (pts[0][1] - touchPY0); applyTransform(); }
  else if (pts.length === 2 && lastPinchD) {
    const d = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]);
    const rect = vp.getBoundingClientRect();
    const mx = (pts[0][0] + pts[1][0]) / 2 - rect.left, my = (pts[0][1] + pts[1][1]) / 2 - rect.top;
    zoomAt(zoom * (d / lastPinchD), mx, my); lastPinchD = d;
  }
}, { passive: false });
vp.addEventListener('touchend', e => {
  Array.from(e.changedTouches).forEach(t => delete touchState[t.identifier]);
  const pts = Object.values(touchState);
  if (pts.length === 1) { touchPX0 = pts[0][0]; touchPY0 = pts[0][1]; touchPanX0 = panX; touchPanY0 = panY; lastPinchD = null; }
}, { passive: false });

// ── Init ──────────────────────────────────────
loadState();
document.getElementById('btn-en').classList.toggle('active', lang === 'en');
document.getElementById('btn-ru').classList.toggle('active', lang === 'ru');
document.getElementById('search-input').placeholder = I18N[lang].searchPlaceholder;
updateViewBtnLabels();
updateCityBtn();
render();
applyTransform();
renderQueue();