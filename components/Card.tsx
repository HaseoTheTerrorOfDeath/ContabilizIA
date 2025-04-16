"use client";

export default function Card({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className={`bg-white shadow-md rounded-xl p-4 border-t-4 ${color}`}>
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

