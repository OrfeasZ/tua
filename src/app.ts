import {Analyzer} from "./parser/analyzer";

const code = `
    local a = 123
    
    function b(c: int) -> string
        return tostring(a) .. tostring(c)
    end
    
    b(567)
`;

const errors = Analyzer.analyze(code);
console.log(errors);
