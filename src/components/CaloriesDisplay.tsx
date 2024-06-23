
type CaloriesDisplayProps = {
    calories: number,
    text: string

}

export default function CaloriesDisplay({calories, text} : CaloriesDisplayProps) {
  return (
    <div>
                <p className=" text-4xl font-bold text-green-900">{calories}</p>
                <p className="font-bold text-lg">{text}</p>

            </div>
  )
}
