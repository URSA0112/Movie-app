'use client'
import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";
import { Sun, Moon, Search, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { ACCESS_TOKEN, BASE_URL } from "../constants";

type MovieGenreType = {
  id: number,
  name: string
}

export function Header({ selectedGenre, setSelectedGenre, searchValue, setSearchValue }: {
  selectedGenre: { id: number; name: string } | null;
  setSelectedGenre: (genre: { id: number; name: string }) => void
  searchValue: string | null;
  setSearchValue: (value: string) => void;
},) {

  const [darkMode, setDarkMode] = useState(false);
  const [genre, setGenre] = useState<MovieGenreType[]>([])

  function HandleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  // ✅ Load dark mode state from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // ✅ Toggle dark mode globally
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    };

    const getGenres = async () => {
      const res = await axios.get(`${BASE_URL}/genre/movie/list`, options)
      setGenre(res.data.genres)
    }
    getGenres()
  }, [])

  const HandleClickGenre = (genre: { id: number; name: string }) => {
    setSelectedGenre(genre);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md p-4" >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">

        {/* 1️⃣ Logo */}
        <img
          src="logo.png"
          alt="Movie Logo"
          className="w-24 max-w-[120px] h-auto"
        />

        {/* 2️⃣ Genre Selector + Search */}
        <div className="flex flex-col md:flex-row items-center md:gap-4 w-full md:w-auto gap-1 ">
          {/* 🎬 Genre Selector Dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-[200px] flex justify-between">
                {selectedGenre && selectedGenre ? genre.find((g) => g.name === selectedGenre.name)?.name : "Choose genre"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full md:w-[200px] p-0">
              <Command>
                <CommandGroup>
                  {genre.map((genre) => (
                    <CommandItem key={genre.id} className="flex justify-between">
                      <div onClick={() => HandleClickGenre(genre)} className="w-full cursor-pointer">
                        {genre.name}
                        {selectedGenre?.id === genre.id &&<Check className="h-4 w-4 text-green-500" />}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {/* 🔍 Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute inset-y-0 left-3 my-auto h-5 w-5 text-gray-400" />
            <Input
              type="text"
              value={searchValue ?? ""}
              onChange={HandleInputChange}
              placeholder="Search movies..."
              className="w-full px-3 py-2 pl-10 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* 3️⃣ Dark Mode Toggle */}
        <Button
          variant="outline"
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-500" />}
        </Button>
      </div>
    </header>
  );
}