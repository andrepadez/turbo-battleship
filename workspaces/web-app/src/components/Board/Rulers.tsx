export const HorizontalRuler = ({ board }) => (
  <div className="grid grid-cols-11 ml-5">
    {board.map((col, idx) => (
      <div key={idx} className="w-8 flex justify-center">
        {idx + 1}
      </div>
    ))}
  </div>
)

export const VerticalRuler = ({ board }) => (
  <div className="grid grid-rows-10 items-center">
    {board.map((col, idx) => (
      <div key={idx} className="mr-2">
        {String.fromCharCode(64 + idx + 1)}
      </div>
    ))}
  </div>
)
