
# Tua

Tua (working title) is a superset of Lua 5.3 which aims to provide optional type-checking support to the language. Tua is backwards compatible with standard Lua, has no runtime dependencies, and compiles to plain old Lua. 

## Compatibility
Tua follows the same basic syntax of Lua, while introducing several optional concepts that allow for static type checking. That means that your existing Lua code is valid Tua code with little to no modification. The Tua compiler produces standard Lua code that can be executed using any supported Lua interpreter or compiler, without requiring any additional runtime dependencies.

## Example Syntax
**NOTICE: This syntax is a work in progress and may not be representative of final Tua syntax.**

    local a: int = 123
    
	function b(x: int, y: int) -> float
		return x / y
	end	
	
	function c(x: (int, int) -> float) -> float
		return x(5, 6)
	end
	
	function d() -> (int, str)
		return 123, "123"
	end
	
	local e: { int } = { 1, 2, 3 }
	local f: { a: str } = { a = "hello" }
	
    typedef MyType {
		x: int,
		y: str,
		z: float,
		w: str?
	}
	
	local g: MyType = {
		x = 456,
		y = "789",
		z = 1.5,
		w = nil
	}
	
	global h str
	h = "goodbye"
	
	typedef GenericType<T> {
	    x: T,
	    y: int?
	}
	
	local i: GenericType<str> = {
	    x = "so generic"
	}
	
	function j<T>(x: T) -> str 
	    return tostring(x)
	end
	
	print(j<int>(123))
	
