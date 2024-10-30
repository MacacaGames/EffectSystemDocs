# Installation

### Option 1: Unity Package Manager
Add the following to your project's manifest.json file:
```json
{
    "dependencies": {
        "com.macacagames.utility": "https://github.com/MacacaGames/MacacaUtility.git",
        "com.macacagames.effectsystem.editor": "git@github.com:MacacaGames/EffectSystem.git?path=Editor/src",
        "com.macacagames.effectsystem.model": "git@github.com:MacacaGames/EffectSystem.git?path=Model/src",
        "com.macacagames.effectsystem.runtime": "git@github.com:MacacaGames/EffectSystem.git?path=Runtime/src",
        "com.macacagames.effectsystem.view": "git@github.com:MacacaGames/EffectSystem.git?path=View",
    }
}
```

### Option 2: Git SubModule
Add the EffectSystem as a Git submodule:
```bash
git submodule add https://github.com/MacacaGames/EffectSystem.git MyPackages
```
> Note: EffectSystem depends on MacacaUtility, so you also need to add MacacaUtility as a Git submodule:
```json
{
    "dependencies": {
        "com.macacagames.utility": "https://github.com/MacacaGames/MacacaUtility.git",
        "com.macacagames.effectsystem.editor": "file:../MyPackages/EffectSystem/Editor/src",
        "com.macacagames.effectsystem.model": "file:../MyPackages/EffectSystem/Model/src",
        "com.macacagames.effectsystem.runtime": "file:../MyPackages/EffectSystem/Runtime/src",
        "com.macacagames.effectsystem.view": "file:../MyPackages/EffectSystem/View",
    }
}
```

---