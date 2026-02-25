local HttpService = cloneref(game:GetService("HttpService"))

local carstats = require(game:GetService("ReplicatedStorage").Configs.CarStats)
local raceinfo = require(game:GetService("ReplicatedStorage").Events.RaceRemotes.RaceInformation)
local racerewards = require(game:GetService("ReplicatedStorage").Events.RaceRemotes.Rewards)

-- cars info
local carsjson = HttpService:JSONEncode({
	lastUpdated = os.date("!%Y-%m-%d"),
	Cars = carstats
})

-- race info
local combinedraces = {}

for i,v in pairs(raceinfo) do
	combinedraces[i] = {
		Map = v.Map,
		Laps = v.Laps,
		Dificulty = v.Dificulty,
		Rewards = racerewards[i] or {}
	}
end

local racesjson = HttpService:JSONEncode({
	lastUpdated = os.date("!%Y-%m-%d"),
	Races = combinedraces
})

makefolder("czgameinfo")
writefile("czgameinfo/cars.json", carsjson)
writefile("czgameinfo/races.json", racesjson)
