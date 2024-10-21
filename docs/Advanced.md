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


EffectSystem:
| Method                                      | Description                                                                              |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `AddTimerTicker`                            | Create a Timer Ticker for the system             |
| `RemoveTimerTicker`                         | Remove the timer Ticker from the system               |
| `AddToTimerTicker`                          | Add a IEffectTimer to a TimerTicker            |
| `RemoveFromTimerTicker`                     | Remove a IEffectTimer from a TimerTicker               |
| `TickEffectTimer`                           | Tick a TimerTicker by Id              |


By default, EffectInstanceBase uses the "Default" TimerTicker.