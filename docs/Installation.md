# Installation

### Option 1: OpenUPM (Recommended)

```sh
openupm add com.macacagames.effectsystem
```

### Option 2: Unity Package Manager
Add the following to your project's manifest.json file:
```json
{
    "dependencies": {
        "com.macacagames.utility": "https://github.com/MacacaGames/MacacaUtility.git",
        "com.macacagames.effectsystem": "https://github.com/MacacaGames/EffectSystem.git"
    }
}
```

### Option 3: Git SubModule
Add the EffectSystem as a Git submodule:
```bash
git submodule add https://github.com/MacacaGames/EffectSystem.git Assets/MacacaEffectSystem
```
> Note: EffectSystem depends on MacacaUtility, so you also need to add MacacaUtility as a Git submodule:
```bash
git submodule add https://github.com/MacacaGames/MacacaUtility.git Assets/MacacaUtility
```
---