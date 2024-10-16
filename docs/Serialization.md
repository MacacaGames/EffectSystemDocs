# Serialization

`MessagePack.CSharp` requires code generation to make `EffectInfo` available for use on AOT platforms.

First, use the `mpc` tool to generate the resolver. Here's an example:
```bash
dotnet new tool-manifest
dotnet tool install MessagePack.Generator
dotnet tool run mpc -i {PATH_TO_YOUR_EFFECTPACKAGE_MODEL_FOLEDR} -o ./Assets/EffectSystemResources/EffectSystem.Generated.cs -r EffectSystemResolver -n MacacaGames.EffectSystem

## Example
## dotnet tool run mpc -i ./MacacaPackages/EffectSystem/Model -o ./Assets/EffectSystemResources/EffectSystem.Generated.cs -r EffectSystemResolver -n MacacaGames.EffectSystem
```

Next, add it to your `StaticCompositeResolver`:
```csharp
StaticCompositeResolver.Instance.Register(
    MacacaGames.EffectSystem.Resolvers.EffectSystemResolver.Instance,
);
```

For more details, refer to the [MessagePack Document](https://github.com/MessagePack-CSharp/MessagePack-CSharp)