# Jest Tutorial
+ What's a good structure for a unit test?

3A: Arrange, Act, Assert
* Arrange: Set up the object to be tested. We may need to surround the object with collaborators. For testing purposes, those collaborators might be test objects (mocks, fakes, etc.) or the real thing.
* Act: Act on the object (through some mutator). You may need to give it parameters (again, possibly test objects).
* Assert: Make claims about the object, its collaborators, its parameters, and possibly (rarely!!) global state.

### Consider the various types of behaviors an object has:

Constructors
Mutators, also known as modifiers or commands
Accessors, also known as queries
Iterators
I learned this separation a long time ago but I don't know the source (though my guess would be some Abstract Data Type research). It's embodied in Bertrand Meyer's "command-query separation" principle, and others have independently invented it.

With those distinctions in mind, we can create tests:

