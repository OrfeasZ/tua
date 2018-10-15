
# Tua

Tua (working title) is a superset of Lua 5.3 which aims to provide optional type-checking support to the language. Tua is backwards compatible with standard Lua, has no runtime dependencies, and compiles to plain old Lua. 

## Compatibility
Tua follows the same basic syntax of Lua, while introducing several optional concepts that allow for static type checking. That means that your existing Lua code is valid Tua code with little to no modification. The Tua compiler produces standard Lua code that can be executed using any supported Lua interpreter or compiler, without requiring any additional runtime dependencies.

## Example Syntax
**NOTICE: This syntax is a work in progress and may not be representative of final Tua syntax.**

    local a: integer = 123
    
	function b(x: integer, y: integer) -> float
		return x / y
	end	
	
	function c(x: (integer, integer) -> float) -> float
		return x(5, 6)
	end
	
	function d() -> (integer, string)
		return 123, "123"
	end
	
	local e: { integer } = { 1, 2, 3 }
	local f: { a: string } = { a = "hello" }
	
    typedef MyType {
		x: integer,
		y: string,
		z: float,
		w: string?
	}
	
	local g: MyType = {
		x = 456,
		y = "789",
		z = 1.5,
		w = nil
	}
	
	global h string
	h = "goodbye"
	
	typedef GenericType<T> {
	    x: T,
	    y: integer?
	}
	
	local i: GenericType<string> = {
	    x = "so generic"
	}
	
	function j<T>(x: T) -> string 
	    return tostring(x)
	end
	
	print(j<integer>(123))
	
