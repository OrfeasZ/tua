import {Analyzer} from "./parser/analyzer";

const code = `
    local a = 100
    
    --[[local function b(c: int) -> int
        return c * a
    end
    
    local d = b(2)]]
`;

const errors = Analyzer.analyze(code);
console.log(errors);
