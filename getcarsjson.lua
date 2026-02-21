local HttpService = cloneref(game:GetService("HttpService"))
local carstats = require(game:GetService("ReplicatedStorage").Configs.CarStats)

local csjson = HttpService:JSONEncode(carstats)

local final = '{"lastUpdated": "'..os.date("!%Y-%m-%d")..'",'..string.sub(csjson, 2)

writefile("cars.json", final)
