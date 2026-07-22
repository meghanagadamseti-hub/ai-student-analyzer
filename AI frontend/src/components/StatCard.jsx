import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function StatCard({
  title,
  value,
  icon,
  change,
  positive = true,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h2>
        </div>

        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>

      </div>

      <div className="flex items-center mt-5">

        {positive ? (
          <FaArrowUp className="text-green-500 mr-2" />
        ) : (
          <FaArrowDown className="text-red-500 mr-2" />
        )}

        <span
          className={`font-semibold ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>

        <span className="text-gray-400 ml-2 text-sm">
          compared to last month
        </span>

      </div>

    </div>
    
  );
}