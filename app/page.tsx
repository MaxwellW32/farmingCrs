"use client"
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <button style={{ color: "black" }}
        onClick={async () => {
          const fixedIds = [
            {
              "id": "1",
              "name": "Tomato",
              "minTemp": 10,
              "maxTemp": 35,
              "optLow": 21,
              "optHigh": 24,
              "idealHumidity": 65
            },
            {
              "id": "2",
              "name": "Maize",
              "minTemp": 10,
              "maxTemp": 35,
              "optLow": 25,
              "optHigh": 30,
              "idealHumidity": 60
            },
            {
              "id": "3",
              "name": "Lettuce",
              "minTemp": 7,
              "maxTemp": 24,
              "optLow": 15,
              "optHigh": 18,
              "idealHumidity": 75
            },
            {
              "id": "4",
              "name": "Bell Pepper",
              "minTemp": 15,
              "maxTemp": 32,
              "optLow": 20,
              "optHigh": 25,
              "idealHumidity": 70
            },
            {
              "id": "5",
              "name": "Carrot",
              "minTemp": 5,
              "maxTemp": 28,
              "optLow": 16,
              "optHigh": 21,
              "idealHumidity": 70
            },
            {
              "id": "6",
              "name": "Potato",
              "minTemp": 7,
              "maxTemp": 30,
              "optLow": 18,
              "optHigh": 22,
              "idealHumidity": 75
            },
            {
              "id": "7",
              "name": "Spinach",
              "minTemp": 2,
              "maxTemp": 24,
              "optLow": 15,
              "optHigh": 18,
              "idealHumidity": 80
            },
            {
              "id": "8",
              "name": "Eggplant",
              "minTemp": 18,
              "maxTemp": 35,
              "optLow": 24,
              "optHigh": 29,
              "idealHumidity": 65
            },
            {
              "id": "9",
              "name": "Cucumber",
              "minTemp": 15,
              "maxTemp": 35,
              "optLow": 22,
              "optHigh": 28,
              "idealHumidity": 85
            },
            {
              "id": "10",
              "name": "Broccoli",
              "minTemp": 4,
              "maxTemp": 26,
              "optLow": 16,
              "optHigh": 20,
              "idealHumidity": 70
            },
            {
              "id": "11",
              "name": "Strawberry",
              "minTemp": 10,
              "maxTemp": 28,
              "optLow": 18,
              "optHigh": 24,
              "idealHumidity": 65
            },
            {
              "id": "12",
              "name": "Okra",
              "minTemp": 20,
              "maxTemp": 40,
              "optLow": 27,
              "optHigh": 32,
              "idealHumidity": 60
            },
            {
              "id": "13",
              "name": "Cabbage",
              "minTemp": 4,
              "maxTemp": 25,
              "optLow": 15,
              "optHigh": 20,
              "idealHumidity": 75
            },
            {
              "id": "14",
              "name": "Soybean",
              "minTemp": 10,
              "maxTemp": 38,
              "optLow": 25,
              "optHigh": 32,
              "idealHumidity": 60
            },
            {
              "id": "15",
              "name": "Peas",
              "minTemp": 5,
              "maxTemp": 25,
              "optLow": 13,
              "optHigh": 18,
              "idealHumidity": 75
            },
            {
              "id": "16",
              "name": "Sweet Potato",
              "minTemp": 15,
              "maxTemp": 37,
              "optLow": 24,
              "optHigh": 30,
              "idealHumidity": 70
            },
            {
              "id": "17",
              "name": "Yam",
              "minTemp": 18,
              "maxTemp": 35,
              "optLow": 25,
              "optHigh": 30,
              "idealHumidity": 80
            },
            {
              "id": "18",
              "name": "Cassava",
              "minTemp": 16,
              "maxTemp": 40,
              "optLow": 25,
              "optHigh": 29,
              "idealHumidity": 65
            },
            {
              "id": "19",
              "name": "Watermelon",
              "minTemp": 18,
              "maxTemp": 38,
              "optLow": 25,
              "optHigh": 33,
              "idealHumidity": 60
            },
            {
              "id": "20",
              "name": "Radish",
              "minTemp": 4,
              "maxTemp": 27,
              "optLow": 15,
              "optHigh": 21,
              "idealHumidity": 70
            },
            {
              "id": "21",
              "name": "Cauliflower",
              "minTemp": 7,
              "maxTemp": 25,
              "optLow": 15,
              "optHigh": 20,
              "idealHumidity": 75
            },
            {
              "id": "22",
              "name": "Pumpkin",
              "minTemp": 15,
              "maxTemp": 32,
              "optLow": 23,
              "optHigh": 29,
              "idealHumidity": 70
            },
            {
              "id": "23",
              "name": "Ginger",
              "minTemp": 18,
              "maxTemp": 35,
              "optLow": 25,
              "optHigh": 28,
              "idealHumidity": 85
            },
            {
              "id": "24",
              "name": "Garlic",
              "minTemp": 5,
              "maxTemp": 30,
              "optLow": 13,
              "optHigh": 24,
              "idealHumidity": 60
            },
            {
              "id": "25",
              "name": "Kale",
              "minTemp": -5,
              "maxTemp": 25,
              "optLow": 15,
              "optHigh": 20,
              "idealHumidity": 75
            }
          ].map(each => {
            each = { ...each }

            each.id = v4()

            return each
          })

          await Promise.all(fixedIds.map(async eachBranch => {
            await addCrop({
              ...eachBranch
            })
          }))
        }}
      >click</button> */}

      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
