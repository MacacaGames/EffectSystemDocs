# Effect Description
It's important to help users understand your effects. The system provides a feature to generate a description based on an `EffectInfo`.

### Description Template 
To generate a runtime description, you need to provide a Description Template first.

Example:
```csharp
var myTemplate = "Deal extra {Effect_Atk_Ratio.value} damage to enemies with full HP.";
var myEffect = new EffectInfo{
    id: "TriggerEffect_Sample",
    type: "Atk_Ratio",
    value: 12
};

var result = effectSystem.GetCustomEffectsDescription(myTemplate, new[]{myEffect});
// result is "Deal extra 12 damage to enemies with full HP."
```

### The rule of the Template

The template uses keywords to detect which parts of the template should be replaced. Here are the rules for defining a keyword:
- Start with the `{` character
- End with the `}` character
- Use `Effect_` or `#` character to define the EffectType (e.g., `#Atk_Ratio` means the `Atk_Ratio` EffectType).
- Use `.` to access members of the EffectInfo, The `.` can continue to access keys from the table below.
- Use `subinfo` or  `>` to access the `EffectInfo` in `subinfo`
s
| Key                 | Description                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------ |
| value               | use the `value` member in the `EffectInfo`                                                   |
| val                 | same as value but simplified                                                               |
| maintainTime        | use the `maintainTime` member in the `EffectInfo`                                            |
| time                | same as `maintainTime` but simplified                                                      |
| cooldownTime        | use the `cooldownTime` member in the `EffectInfo`                                            |
| cd                  | same as `cooldownTime` but simplified                                                      |
| activeProbability   | use the `activeProbability` member in the `EffectInfo`                                       |
| activeProb          | same as `activeProbability` but simplified                                                 |
| deactiveProbability | use the `deactiveProbability` member in the `EffectInfo`                                     |
| deactiveProb        | same as `deactiveProbability` but simplified                                               |
| :%                  | The value will be display as percentage, the value will be multiplied by 100 and display as oo% |

## Default Description
It's recommended to create a default description for each `EffectType`.

```csharp
// First, register the template resource
EffectDataProvider.SetEffectDescriptionStringDelegate(
    (m) =>
    {   
        // m is the EffectType
        switch(m){
            case "Atk_Ratio":
                return "Deal extra {Effect_Atk_Ratio.value} damage to enemies with full HP.";
            case "Defend":
                return "Reduce {Effect_Defend.value} damage taken.";
        }
    }
);

var effect_sample_01 = new EffectInfo{
    id: "effect_sample_01",
    type: "Atk_Ratio",
    value: 123
};
var effect_sample_02 = new EffectInfo{
    id: "effect_sample_02",
    type: "Defend",
    value: 999
};
// After that, you can directly call EffectSystem.GetDefaultEffectDescription() to get the default description
var result = effectSystem.GetDefaultEffectDescription(effect_sample_01);
// result is: "Deal extra 123 damage to enemies with full HP."

// Or provide multiple EffectInfo objects, and the system will automatically combine all descriptions line by line
var result = EffectSystem.Instance.GetDefaultEffectDescription(new []{effect_sample_01, effect_sample_02});
/* 
result is:
Deal extra 123 damage to enemies with full HP.
Reduce 999 damage taken.
*/
```

A more complex example:
```csharp
var effect_sample_01 = new EffectInfo{
    id: "effect_sample_01",
    type: "Trigger_Attach",
    value: 0,
    subInfoIds:new []{"effect_sample_subinfo_01"}
};

var effect_sample_02 = new EffectInfo{
    id: "effect_sample_02",
    type: "Atk_Ratio",
    maintainTime: 4.5,
    value: 999
};

// In this case, `effect_sample_01` has subInfos, so we need to register the EffectDataProvider. The subInfo is queried during runtime.
var effect_sample_subinfo_01 = new EffectInfo{
    id: "effect_sample_subinfo_01",
    type: "Trigger_HitSelf_Constant",
    value: 555
};

var effects = new []{effect_sample_01, effect_sample_02, effect_sample_subinfo_01};
EffectDataProvider.SetEffectInfoDelegate(
    (List<string> effectIds) =>
    {
        return effects.Where(m => effectIds.Contains(m.id)).ToList();
    }
);

var myTemplate = @"Deal extra {Effect_Trigger_Attach>Effect_Trigger_HitSelf_Constant.value} damage to enemies with 50% or less HP.
Increase {Effect_Atk_Ratio.value} Attack for {Effect_Atk_Ratio.time} seconds after killing an enemy.";

// Provide multiple EffectInfo objects, and the system will automatically combine all descriptions line by line.
// The subInfo is resolved at runtime, so only the root EffectInfos need to be passed.
var result = EffectSystem.Instance.GetCustomEffectsDescription(myTemplate, new []{effect_sample_01, effect_sample_02});
/* 
result will be: 
Deal extra 555 damage to enemies with 50% or less HP.
Increase 999 Attack for 4.5 seconds after killing an enemy.
*/
```

> It is recommended to use `EffectSystem.GetCustomEffectsDescription()` to generate a user-friendly description 