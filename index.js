
const Discord = require('discord.js')
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES']})
const config = require('./config.json')
const command = require('./command')
const { ClientUser } = require('discord.js/src/index.js')

// let milDay = 864000000;
// let milHour = 3600000;
let milDay = 1000;
let milHour = 1000;

let holiday = ["10/10", "14/10", "15/10", "19/10", "04/11", "25/12"];

let zero = 0;

const timeTable = [
    { name: "NO", link : "NILL" },
    { name : "PTAS", link : "https://meet.google.com/syx-seup-wwo" },
    { name : "DSA", link : "https://meet.google.com/lookup/dxs3kd7ucq" },
    { name : "DSA LAB", link : "https://meet.google.com/fai-pvqf-dbr" },
    { name : "DLD", link : "https://meet.google.com/rte-knkc-wju" },
    { name : "DLD LAB", link : "https://meet.google.com/gnu-mdau-ixa" },
    { name : "OOP", link : "https://meet.google.com/mhq-kfxm-dcc" },
    { name : "ECE", link : "https://meet.google.com/lookup/hihh2gsdzy" },
    { name : "ESE", link : "https://meet.google.com/hcs-dqk7-kd2" },
    { name : "MPMC", link : "https://meet.google.com/def-jrvx-sns" },
]

const day1 = ["NO", "DLD LAB", "NO", "NO", "ESE", "OOP", "NO", "NO"]
const day2 = ["DSA", "DLD", "PTAS", "ECE", "NO", "MPMC", "NO", "NO"]
const day3 = ["MPMC", "DSA", "PTAS", "DLD", "DLD LAB", "NO", "NO", "NO"]
const day4 = ["OOP", "ESE", "ECE", "PTAS", "DSA", "MPMC", "NO"]
const day5 = ["ECE", "PTAS", "MPMC", "ESE", "OOP", "DLD", "NO", "NO"]

var day = [day1, day2, day3, day4, day5]
// var time = ["8:50", "9:50", "10:50", "11:50", "13:50", "14:50", "15:50", "16:50"]
var today = []

const timer = ms => new Promise(res => setTimeout(res, ms))

async function dayOrder () { 
    while (1) {
        for (var i = 1; i < 5; i++) {
            if (holidays()) {
                console.log("holiday!")
                await timer(`${zero + milDay}`)
            }
            else {
                if (currentTime === "8:50" || 1) {
                    const names = []
                    const links = []
                    Array.from(day[i]).forEach(function (key) {
                        var found = false;
                        timeTable.filter(function (sub) {
                            if (!found && sub.name == key) {
                                names.push(sub.name)
                                links.push(sub.link)
                                found = true;
                                return false;
                            }
                            else{
                                return true;
                            }
                        })
                    })
                    for (var j = 0; j < links.length; j++) {
                        var k = 0
                        // console.log(j)
                        if (cmd && k === j) {
                            today.push(update());
                            send ()
                            temp = cmd;
                            cmd = "false";
                        }
                        if (names[j] != "NO" && cmd != "false") {
                            // console.log(cmd)
                            today.push(`\nYou have ${names[j]} now\nJoin using the link ${links[j]} ASAP`)
                            send()
                        }
                        cmd = temp
                        if (names[j] === "NO") {
                            // console.log("\nYou have no class now\n")
                            client.on("ready", function () {
                                client.channels.cache.get("893577313336299602").send("You have no class now")
                            })
                        }
                        await timer (`${milHour}`)
                        k++
                    }
                }
                else {
                    console.log(`waiting for 8:50 now its ${currentTime}`)
                } 
            } 
        }
        i = 0
    }   
}

let date = new Date();

let currentTime = date.getHours() + ":" + date.getMinutes();
let currentMinute = date.getMinutes()

let holidays = () => {
    let currentDate = date.getDate() + "/" + date.getMonth();
    function weekEnd () {
        return date.getDay() === 0 || date.getDay() === 6 
    }
    if (holiday.includes(currentDate) || weekEnd()) {
        return true;
    }
    else {
        return false;
    }
}

var cmd = "DLD LAB";
// var cmd

// function noClass () {
//     console.log("You have no class now")
// }

function updateClass (className) {
    const updatedClass = timeTable.find((item) => {
        return item.name === className;
    });
    return updatedClass;
}

function update () {
    if ((cmd && currentMinute < 59 && currentMinute > 30) || cmd) {
    // if(cmd) {
        // console.log(`You have ${updateClass(cmd).name} class now and Join by link ${updateClass(cmd).link}`);
        return `\nYou have ${updateClass(cmd).name} class now\nJoin by link ${updateClass(cmd).link}\n`;
    }
    else {
        console.log("Following day order")
    }
}

function send () {
    if ((currentMinute == "50" && currentTime != "12:50") || 1) {
        console.log(today.pop())
        // client.channels.cache.get("893577313336299602").send(today.pop())
        // client.on("ready", async function () {
        //     const guild = await client.guilds.fetch('guild-id-here');
        //     guild.channels.cache.get('893577313336299602').send(today.pop());

        // })
    }
    else {
        // console.log("waiting for the 50th minute")
    }
}

dayOrder()

client.on("ready", function () {
    console.log("Rias 2.0 on the go !")

    command(client, "ping", (message) => {
        message.channel.send("Pong !")
    }) 
    
})
require('events').EventEmitter.defaultMaxListeners = 150;

client.login(config.token)