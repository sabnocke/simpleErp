export const fields = $state([
    {cName: "bud", label: "Budget"},
    {cName: "mat", label: "Material"},
    {cName: "ove", label: "Overhead"},
])

type Row = [string, number, number, number, number, boolean]

export const fullMatrix: { rows: number, matrix: Row[] } = $state({
    rows: 1,
    matrix: [["Wrong index chosen", -1, -1, -1, -1, false]]
})