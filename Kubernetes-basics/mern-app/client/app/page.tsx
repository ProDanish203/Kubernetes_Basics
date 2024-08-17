"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

export default function Home() {
  const [val, setVal] = useState("");
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/jokes`
    );
    if (data && data.success) setData(data.jokes);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!val) return;
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/joke`,
      { joke: val }
    );
    if (!data.success) return;
    else {
      fetchData();
      setVal("");
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="container mx-auto py-24">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Enter a joke"
          value={val}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setVal(e.target.value)
          }
          required
          className="py-2 px-4 border border-neutral-800 bg-neutral-900 outline-none w-full rounded-lg"
        />
      </form>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
        {data.map((joke: any) => (
          <div key={joke._id} className="w-1/3">
            <div className="bg-neutral-900 p-5 rounded-lg">
              <p className="text-lg font-bold">{joke.joke}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
