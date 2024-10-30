# Advanced

### Inject model

**Inject model** is a feature that allows for easily passing parameters of different types to `EffectInstanceBase`.

When calling `EffectSystem.EffectTriggerCondition` to trigger a condition, you need to provide `EffectTriggerConditionInfo`. By including the models parameter when constructing `EffectTriggerConditionInfo`, you can pass any number of parameters of different types.

Example:
```csharp
public class CharacterInstance : IEffectableObject
{
    Skill skill; //a custom class storing skill info

    effectSystem.EffectTriggerCondition( 
        "OwnerBeforeDoAttack",
        this,
        new EffectTriggerConditionInfo(owner: this, targets: targetsIEffectables, skill) //send the skill as one of the models
    );
}

public class Effect_Attach : EffectTriggerBase
{
    Skill skill; // being injected automatically

    public Effect_Attach(EffectSystem effectSystem) : base(effectSystem)
    {
    }

    protected override void OnTrigger(EffectTriggerConditionInfo conditionInfo)
    {
        base.OnTrigger(conditionInfo);

        //Do something with skill variable
    }
}

```


### TimerTickers and IEffectTimers

An EffectSystem instance manages multiple `TimerTickers`, and each `TimerTicker` manages multiple `IEffectTimers`.


Here are the timer-related APIs provided by the Effect System:
| Method                                      | Description                                                                              |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `AddTimerTicker`                            | Create a Timer Ticker for the system             |
| `RemoveTimerTicker`                         | Remove the timer Ticker from the system               |
| `AddToTimerTicker`                          | Add a IEffectTimer to a TimerTicker            |
| `RemoveFromTimerTicker`                     | Remove a IEffectTimer from a TimerTicker               |
| `TickEffectTimer`                           | Tick a TimerTicker by Id              |


When an Effect System is initialized, a `TimerTicker` with the ID "Default" is automatically included. By default, `EffectInstanceBase` comes with an `IEffectTimer`, which is added to the "Default" `TimerTicker` upon creation. Therefore, if there are no special requirements, you can control your effects simply by using `TickEffectTimer()`.

For more complex scenarios, such as when the maintainTime or cooldownTime of an effect need to use different time units, you can override maintainTimeTimerId or cooldownTimeTimerId in `EffectInstanceBase`. This allows them to be assigned to different TimerTickers.

First, add your game-specific time units.
```csharp
effectSystem.AddTimerTicker("Action");
effectSystem.AddTimerTicker("Turn");
```
Override `maintainTimeTimerId` or `cooldownTimeTimerId` in `EffectInstanceBase`
```csharp
public class EffectInstanceCustom : EffectInstanceBase
{
    public EffectInstanceCustom(EffectSystem effectSystem) : base(effectSystem)
    {
    }

    //make maintain time and cooldown tick with corresponding timer 
    public override string maintainTimeTimerId => "Action";
    public override string cooldownTimeTimerId => "Turn";
}
```

Then, call `TickEffectTimer()` based on your game logic.
```csharp
void OnActionEnd()
{
    effectSystem.TickEffectTimer("Action", 1);
}

void OnTurnEnd()
{
    effectSystem.TickEffectTimer("Turn", 1);
}
```


### Description Builder

`DescriptionBuilder` allows you to dynamically display descriptions for any object. By using reflection to match field names, you can replace values in a description with the values of specific fields from an object.

The fields to be looked up are enclosed in `{[ ]}`. If a matching field name is found, it will be replaced with the actual value.

```csharp
public class TestClass
{
    public int hp = 10;
    public int level { get; set; } = 11;
    public string name { get; set; } = "Neva";
    public List<string> tags { get; set; }  = new List<string>() {"element1", "element2"};
}

TestClass testClass = new TestClass();
string descriptionBase = "{[name]} is Lv.{[level]} and hp:{[hp]}, {[tags[0]]} and {[tags[1]]} in tags";
var description = DescriptionBuilder.GetDescriptionFormat(descriptionBase, testClass);
Debug.Log(description);
// result is: Neva is Lv.11 and hp:10, element1 and element2 in tags
```

If you want to implement special query logic, you can inherit from `DescriptionBuilder` and implement custom logic.

`DescriptionBuilderForEffect` inherits and utilizes the functionality of `DescriptionBuilder` to query fields in `EffectInfo`. It further handles percentage displays, nested data within `EffectInfo`, and similar complex data requirements.

| Purpose                                      | Method                                            | Example                       |
|----------------------------------------------|---------------------------------------------------|-------------------------------|
| Display value as a percentage                | Add `%` at the end of the field name              | `{[fieldName%]}`              |
| Access nested structure within `EffectInfo`  | Append a number to the field name for indexing    | `{[nestedField2]}`            |

```csharp
EffectInfo testEffectInfo =  new EffectInfo();  
testEffectInfo.value = 1;
testEffectInfo.subInfoIds = new List<string>(){"stealth_01"};
Debug.Log(DescriptionBuilderForEffect.GetEffectDescriptionFormat("Deal {[value%]} x ATK damage. Gain stealth for {[subInfos0.maintainTime]} actions.", testEffectInfo));

//result is: Deal 100% x ATK damage. Gain stealth for 5 actions.
```
> Note: In the example using subInfos0, you must first register the method to query subInfo to locate it successfully. For detailed registration instructions, see: [SubInfo](./Fundamentals#subinfo)