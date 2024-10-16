# Introduction

The Effect System is a powerful numerical calculator based on EffectType. It offers high flexibility, manageable states, custom logic implementation, trigger conditions, and visual management. Effect System can handle various functionalities, such as:

- Increasing ATK by 50 points.
- Increasing HP by 10%.
- Increasing DEF by 5% for 50 seconds.
- Reducing a specified enemy's ATK by 100 points, usable every 30 seconds.
- Reducing the opponent's DEF by 50% when a successful block occurs.

The system uses tables to combine various buffs, debuffs, or special effects, with `EffectInfo` as the core unit, allowing for easy application across different projects. Engineers only need to implement the `EffectType` and register activation and deactivation timings.


### Features
- Adjust effects through Excel
- Combine different Effect using `EffectSubInfo`