import {expect} from "chai";
import {Compiler} from "../src/compiler/compiler";

describe("Compiler", () => {
    it("can compile tua", () => {
        const luaScript = `
            global a str
            a = "hello"
            local b: str = "world"
            local c = a .. b
            a = "goodbye"
            
            function d<T>(x: T) -> str
                return tostring(x)
            end
            
            typedef MyType {
                x: str?,
                y: int
            }
            
            local e: MyType = {
                y = 123
            }
            
            local f: {float} = {1.0, 1.5, 2.0, 2.5}
            
            for i: int, x: float in pairs(f) do
                i = i - 1
                print(d(i) .. ' = ' .. d(x))
            end
`;

        const output = Compiler.compileTextSync(luaScript);
        console.log("Done compiling");
        console.log(output[0]);
    });
});
