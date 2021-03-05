//SC BY MHANKBARBAR
//RECODE BY ITSMEIKYXSEC404 & RIZKYO
//FREE WEB API BY ITSMEIKYXSEC404
//INFODEVELOPER JANGAN DI HAPUS AJG
//NUMPANG NAMA DOANG LU AJG
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
prefix = setting.prefix
blocked = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)}J ${pad(minutes)}M ${pad(seconds)}D`
}

async function starts() {
	const onlydev = new WAConnection()
	onlydev.logger.level = 'warn'
	console.log(banner.string)
	onlydev.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./self-bot.json') && onlydev.loadAuthInfo('./self-bot.json')
	onlydev.on('connecting', () => {
		start('2', 'Connecting...')
	})
	onlydev.on('open', () => {
		success('2', 'Connected')
	})
	await onlydev.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./self-bot.json', JSON.stringify(onlydev.base64EncodedAuthInfo(), null, '\t'))

	onlydev.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	onlydev.on('chat-update', async (odc) => {
		try {
            if (!odc.hasNewMessage) return
            odc = odc.messages.all()[0]
			if (!odc.message) return
			if (odc.key && odc.key.remoteJid == 'status@broadcast') return
			if (!odc.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(odc.message)
			const from = odc.key.remoteJid
			const type = Object.keys(odc.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && odc.message.conversation.startsWith(prefix)) ? odc.message.conversation : (type == 'imageMessage') && odc.message.imageMessage.caption.startsWith(prefix) ? odc.message.imageMessage.caption : (type == 'videoMessage') && odc.message.videoMessage.caption.startsWith(prefix) ? odc.message.videoMessage.caption : (type == 'extendedTextMessage') && odc.message.extendedTextMessage.text.startsWith(prefix) ? odc.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? odc.message.conversation : (type === 'extendedTextMessage') ? odc.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			const botNumber = onlydev.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const totalchat = await onlydev.chats.all()
			const sender = isGroup ? odc.participant : odc.key.remoteJid
			const groupMetadata = isGroup ? await onlydev.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				onlydev.sendMessage(from, teks, text, {quoted:odc})
			}
			const apikey = setting.apiKey // get on https://leyscoders-api.herokuapp.com
			const sendMess = (hehe, teks) => {
				onlydev.sendMessage(hehe, teks, text)
			}
			const freply = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }
			
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? onlydev.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : onlydev.sendMessage(from, teks.trim(), extendedText, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = onlydev.contacts[from] != undefined ? onlydev.contacts[from].vname || onlydev.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }
			
			
			switch(command) {
				case 'help':
				case 'menu':
runtime = process.uptime()
	onlydev.sendMessage(from, `
┏━━━━《 OnlyDev City シ︎ 》━━━━
┃
┣◪ 𝗜𝗡𝗙𝗢
┃ ❏ Runtime: ${kyun(runtime)}
┃ ❏ Prefix: 「 ${prefix} 」
┃ ❏ Selfbot By OnlyDev City
┃ ❏ Api : https://onlydevcity.herokuapp.com/
┃
┣◪ 𝗠𝗘𝗡𝗨 𝗠𝗔𝗞𝗘𝗥
┃
┣ ❏ ${prefix}sticker
┣ ❏ ${prefix}fakeaddress
┣ ❏ ${prefix}battlefield
┣ ❏ ${prefix}8bit
┣ ❏ ${prefix}googlesearch
┣ ❏ ${prefix}glitch
┣ ❏ ${prefix}pubglogo
┣ ❏ ${prefix}butterfly 
┣ ❏ ${prefix}hbd 
┣ ❏ ${prefix}shine 
┣ ❏ ${prefix}thenight 
┣ ❏ ${prefix}rainbow 
┣ ❏ ${prefix}love 
┣ ❏ ${prefix}burnpaper 
┣ ❏ ${prefix}onecup 
┣ ❏ ${prefix}sky 
┣ ❏ ${prefix}nature 
┣ ❏ ${prefix}rosegold 
┣ ❏ ${prefix}nature3d 
┣ ❏ ${prefix}ocean 
┣ ❏ ${prefix}woodheart 
┣ ❏ ${prefix}summer 
┣ ❏ ${prefix}underglass 
┣ ❏ ${prefix}cemetery 
┣ ❏ ${prefix}royallock 
┣ ❏ ${prefix}coffecup 
┣ ❏ ${prefix}coffecup2 
┣ ❏ ${prefix}neon 
┣ ❏ ${prefix}glow 
┣ ❏ ${prefix}summer 
┣ ❏ ${prefix}flower 
┣ ❏ ${prefix}grandient 
┣ ❏ ${prefix}embroidery 
┣ ❏ ${prefix}funnycup 
┣ ❏ ${prefix}orchids 
┣ ❏ ${prefix}smoke2 
┣ ❏ ${prefix}loveone 
┣ ❏ ${prefix}smoke 
┣ ❏ ${prefix}onesilk 
┣ ❏ ${prefix}glowing 
┣ ❏ ${prefix}heart 
┣ ❏ ${prefix}wolf 
┣ ❏ ${prefix}candy 
┣ ❏ ${prefix}nulis 
┃
┣ ◪ 𝗠𝗘𝗡𝗨 𝗢𝗧𝗛𝗘𝗥
┃
┣ ❏ ${prefix}simisimi
┣ ❏ ${prefix}shortlink
┣ ❏ ${prefix}shortlink2
┣ ❏ ${prefix}shortlink3
┣ ❏ ${prefix}asmaulhusna
┣ ❏ ${prefix}covidindo
┣ ❏ ${prefix}covidglobal
┣ ❏ ${prefix}infogempa
┣ ❏ ${prefix}meme
┣ ❏ ${prefix}randomwp
┣ ❏ ${prefix}quotes
┣ ❏ ${prefix}gabut
┣ ❏ ${prefix}quotemuslim
┣ ❏ ${prefix}faktaunik
┣ ❏ ${prefix}hilih 
┣ ❏ ${prefix}artinama 
┣ ❏ ${prefix}lirik
┣ ❏ ${prefix}chord
┣ ❏ ${prefix}kodepos
┣ ❏ ${prefix}igstalk
┣ ❏ ${prefix}tiktokstalk
┣ ❏ ${prefix}lacakip
┣ ❏ ${prefix}cuaca
┣ ❏ ${prefix}dkasia
┣ ❏ ${prefix}cekresijne
┣ ❏ ${prefix}blackpink
┣ ❏ ${prefix}kbbi
┣ ❏ ${prefix}translate
┣ ❏ ${prefix}playstore
┣ ❏ ${prefix}joox
┣ ❏ ${prefix}infofilm
┣ ❏ ${prefix}infoilm2
┣ ❏ ${prefix}lk21
┣ ❏ ${prefix}caklontong
┣ ❏ ${prefix}tebakgambar
┃
┣ ◪ 𝗠𝗘𝗡𝗨 𝗡𝗘𝗪𝗦
┃
┣ ❏ ${prefix}liputan6
┣ ❏ ${prefix}cnnnews
┣ ❏ ${prefix}republika
┣ ❏ ${prefix}temponews
┣ ❏ ${prefix}kumparannews
┣ ❏ ${prefix}lazymedia
┣ ❏ ${prefix}resepmakanan
┃
┣ ◪ 𝗠𝗘𝗡𝗨 𝗔𝗡𝗜𝗠𝗘 𝗦𝗘𝗔𝗥𝗖𝗛
┃
┣ ❏ ${prefix}manga
┣ ❏ ${prefix}kusonime
┣ ❏ ${prefix}coupleship
┣ ❏ ${prefix}topanime
┃
┣ ◪ 𝗠𝗘𝗡𝗨 𝗔𝗡𝗜𝗠𝗘 𝗣𝗜𝗖𝗧𝗨𝗥𝗘
┃
┣ ❏ ${prefix}yuri
┣ ❏ ${prefix}pussy
┣ ❏ ${prefix}nekonime
┣ ❏ ${prefix}baka
┣ ❏ ${prefix}blowjob
┣ ❏ ${prefix}lewd
┣ ❏ ${prefix}hentai
┣ ❏ ${prefix}waifu
┣ ❏ ${prefix}eroyuri
┣ ❏ ${prefix}hug
┣ ❏ ${prefix}hug2
┣ ❏ ${prefix}awoo
┣ ❏ ${prefix}lick
┣ ❏ ${prefix}kiss
┣ ❏ ${prefix}smug
┣ ❏ ${prefix}cuddle
┣ ❏ ${prefix}bully
┣ ❏ ${prefix}shinobu
┣ ❏ ${prefix}megumin
┣ ❏ ${prefix}blush
┣ ❏ ${prefix}highfive
┣ ❏ ${prefix}handhold
┣ ❏ ${prefix}smile
┣ ❏ ${prefix}glomp
┣ ❏ ${prefix}cringe
┣ ❏ ${prefix}hentaipict
┃
┗━━━━《 OnlyDev City シ︎ 》━━━━`, MessageType.text, {quoted: freply})
					break
				case 'stiker': 
				case 'sticker':
					if ((isMedia && !odc.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo : odc
						const media = await onlydev.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								onlydev.sendMessage(from, buff, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && odc.message.videoMessage.seconds < 11 || isQuotedVideo && odc.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo : odc
						const media = await onlydev.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`Yah error dek`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								onlydev.sendMessage(from, buff, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(odc).replace('quotedM','m')).message.extendedTextMessage.contextInfo : odc
						const media = await onlydev.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Yah error dek')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								buff = fs.readFileSync(ranw)
								onlydev.sendMessage(from, buff, sticker, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
							})
						    })					
					} else {
						reply(`𝗸𝗶𝗿𝗶𝗺 𝗴𝗮𝗺𝗯𝗮𝗿 𝗱𝗲𝗻𝗴𝗮𝗻 𝗰𝗮𝗽𝘁𝗶𝗼𝗻 ${prefix}𝘀𝘁𝗶𝗰𝗸𝗲𝗿 𝗮𝘁𝗮𝘂 𝗿𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝗴𝗮𝗺𝗯𝗮𝗿`)
					}
					break
		case 'notif': // Case By Nayla Chan
				onlydev.updatePresence(from, Presence.composing)
				teks = `Notif dari @${sender.split("@")[0]}\n*Pesan : ${body.slice(7)}*`
				group = await onlydev.groupMetadata(from);
				member = group['participants']
				jids = [];
				member.map(async adm => {
				jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
				})
				options = {
				text: teks,
				contextInfo: {
				mentionedJid: jids
				},
				quoted: odc
				}
				await onlydev.sendMessage(from, options, text)
				break
		case 'tebakgambar':
					anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/kuis/tebakgambar?apikey=onlyonedeveloper`, {method: 'get'})
					buffer = await getBuffer(anu.result.images)
					setTimeout( () => {
					onlydev.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					onlydev.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					onlydev.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					onlydev.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					onlydev.sendMessage(from, buffer, image, { caption: '_Jelaskan Apa Maksud Gambar Ini_', quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
					}, 0) // 1000 = 1s,
					break
        case 'caklontong':
					anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/kuis/caklontong?apikey=onlyonedeveloper`, {method: 'get'})
					setTimeout( () => {
					onlydev.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban+'\n'+anu.result.deskripsi, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					onlydev.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					onlydev.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					onlydev.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 1000) // 1000 = 1s,
					setTimeout( () => {
					onlydev.sendMessage(from, anu.result.soal, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
					}, 0) // 1000 = 1s,
					break
		case 'igpost': // Update By ItsmeikyXSec404 & RzkyO				
				if (args.length < 1) return reply('Urlnya mana tong?')
				if (!isUrl(args[0]) && !args[0].includes('www.instagram.com')) return reply('ini bukan url instagram anjim')
				ige = body.slice(8)
                anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/ig?url=${args[0]}&apikey=onlyonedeveloper`, {method: 'get'})
				buffer = await getBuffer(anu.hasil.result.data.data)
                onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
				break
		case 'igvideo': // Update By ItsmeikyXSec404 & RzkyO				
				if (args.length < 1) return reply('Urlnya mana tong?')
				if (!isUrl(args[0]) && !args[0].includes('www.instagram.com')) return reply('ini bukan url instagram anjim')
				ige = body.slice(9)
                anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/ig?url=${args[0]}&apikey=onlyonedeveloper`, {method: 'get'})
				buffer = await getBuffer(anu.hasil.result.data.data)
                onlydev.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.hasil.result.data.type}.mp4`, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
				break
		case 'fakeaddress': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/fakedata?country=en&apikey=onlyonedeveloper`)
				teks = `➸ *Nama* : ${anu.result.name}\n*➸ Birthday :* ${anu.result.birthday}\n*➸ Address :* ${anu.result.address}\n*➸ City :* ${anu.result.city}\n*➸ Region :* ${anu.result.region}\n*➸ Country :* ${anu.result.country}\n*➸ Zip Code :* ${anu.result.zip}\n*➸ Phone Number :* ${anu.result.phone_number}\n*➸ Username :* ${anu.result.username}\n*➸ Password :* ${anu.result.password}\n*➸ Email :* ${anu.result.email}`
				onlydev.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
				break
		case 'battlefield': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`textnya mana om?`)					
				ct = body.slice(12)
				ll1 = ct.split("|")[0];
				ll2 = ct.split("|")[1];
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/game?text=${ll1}&text2=${ll2}&theme=battlefield&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case '8bit': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(5)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev13?text=${ll1}&text2=${ll2}&theme=8bit&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'googlesearch': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(14)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				ll3 = ct.split("|")[2];
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker?text=${ll1}&text2=${ll2}&text3=${ll3}&theme=google-suggestion&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'glitch': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(7)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker?text=${ll1}&text2=${ll2}&theme=glitch&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'pubglogo': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(9)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/game?text=${ll1}&text2=${ll2}&theme=pubg&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'butterfly': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(10)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro11?text=${ct}&theme=butterfly&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'hbd': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(4)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro10?text=${ct}&theme=birthday&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'shine': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(6)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro10?text=${ct}&theme=shinetext&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'thenight': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(9)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro9?text=${ct}&theme=thenight&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'rainbow': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(8)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro9?text=${ct}&theme=rainbow3d&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'love': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(5)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev4?text=${ct}&theme=lovemessage&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'burnpaper': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(10)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev4?text=${ct}&theme=burnpaper&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'textonecup': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(11)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev3?text=${ct}&theme=textonecup&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'textsky': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(8)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev3?text=${ct}&theme=textsky&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'nature': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(7)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev2?text=${ct}&theme=nature&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'rosegold': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(7)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev2?text=${ct}&theme=rosegold&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'nature3d': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(9)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev1?text=${ct}&theme=nature3d&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'ocean': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(6)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev1?text=${ct}&theme=underwater-ocean&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'woodheart': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(10)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev?text=${ct}&theme=woodheart&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'summertext': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(11)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev?text=${ct}&theme=summertext&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'underglass': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(11)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev5?text=${ct}&theme=underglass&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'cemetery': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(9)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev5?text=${ct}&theme=cemetery&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'royallock': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(10)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/onedev6?text=${ct}&theme=royallock&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'coffecup': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(9)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/senja?text=${ct}&theme=coffee-cup&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'coffecup2': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)	
				ct = body.slice(10)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/senja?text=${ct}&theme=coffee-cup2&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'neon': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(5)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/metallic?text=${ct}&theme=neon&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'glow': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(5)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/senja?text=${ct}&theme=glow&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'summer': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(7)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/alam?text=${ct}&theme=summer&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'flower': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(6)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/alam?text=${ct}&theme=flower&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'grandient': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(10)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro6?text=${ct}&theme=grandient&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'embroidery': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(11)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro7?text=${ct}&theme=embroidery&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'funnycup': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(9)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro4?text=${ct}&theme=funnycup&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'orchids': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(11)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro5?text=${ct}&theme=orchids-flower&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'smoke2': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(7)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro5?text=${ct}&theme=smoke2&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'loveone': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(8)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro3?text=${ct}&theme=loveone&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'smoke': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(6)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro3?text=${ct}&theme=smoke&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'onesilk': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(8)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro3?text=${ct}&theme=onesilk&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'glowing': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(8)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro1?text=${ct}&theme=glowing&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'heart': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(6)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro?text=${ct}&theme=heart&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'wolf': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(5)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker/pro?text=${ct}&theme=wolf-metal&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'candy': // Update By RzkyO & ItsmeikyXSec404				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(6)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textpro/pro7?text=${ct}&theme=candy&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'nulis': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(6)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nulis?text=${ct}&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'yuri': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nsfw/yuri?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'pussy': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nsfw/pussy?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'nekonime': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nsfw/nekonime?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'baka': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nsfw/baka?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'blowjob': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nsfw/blowjob?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'lewd': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nsfw/lewd?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'hentai': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nsfw/hentaigif?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'waifu': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nsfw/waifu?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'eroyuri': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nsfw/eroyuri?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'hug': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/nsfw/hug?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'hug2': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/sfw/hug?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'awoo': // masih ngebug
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/sfw/awoo?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'lick': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/sfw/lick?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'kiss': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/sfw/kiss?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'smug': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/sfw/smug?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'cuddle': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/sfw/cuddle?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'bully': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/sfw/bully?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JStw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'shinobu': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/sfw/shinobu?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'megumin': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/sfw/megumin?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'blush': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/anime/blush?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'highfive': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/anime/highfive?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'handhold': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/anime/handhold?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'smile': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/anime/smile?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'glomp': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/anime/glomp?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'cringe': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/anime/cringe?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'shortlink':
				 // Update By RzkyO & ItsmeikyXSec404
				onlydev.updatePresence(from, Presence.composing) 
				data = await fetchJson(`https://onlydevcity.herokuapp.com/api/short/vgd?url=${args[0]}&apikey=onlyonedeveloper`)
				hasil = `link : ${args[0]}\n\nOutput : ${data.result.link}`
				reply(hasil)
				break
		case 'shortlink2':
				 // Update By RzkyO & ItsmeikyXSec404
				onlydev.updatePresence(from, Presence.composing)
				reply(`[❕] Loading`)
				data = await fetchJson(`https://onlydevcity.herokuapp.com/api/short/isgd?url=${args[0]}&apikey=onlyonedeveloper`)
				hasil = `link : ${args[0]}\n\nOutput : ${data.result.link}`
				reply(hasil)
				break
		case 'shortlink3':
				 // Update By RzkyO & ItsmeikyXSec404
				onlydev.updatePresence(from, Presence.composing)
				reply(`[❕] Loading`)
				data = await fetchJson(`https://onlydevcity.herokuapp.com/api/short/tiny?url=${args[0]}&apikey=onlyonedeveloper`)
				hasil = `link : ${args[0]}\n\nOutput : ${data.result.link}`
				reply(hasil)
				break
		case 'asmaulhusna': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/muslim/asmaulhusna?apikey=onlyonedeveloper`, {method: 'get'})
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Nomor:* : ${i.index}\n*Latin* : ${i.latin}\n*Arab* : ${i.arabic}\n*Translate Indo* : ${i.translation_id}\n*Translate English* : ${i.translation_en}\n=================\n`
				}
				reply(teks)
				break
		case 'covidindo': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/covidindo?apikey=onlyonedeveloper`, {method: 'get'})
				teks = '=================\n'
				for (let i of asu.result) {
					teks += `*Kode Provinsi:* : ${i.attributes.Kode_Provi}\n*Provinsi* : ${i.attributes.Provinsi}\n*Total Positif* : ${i.attributes.Kasus_Posi}\n*Total Sembuh* : ${i.attributes.Kasus_Semb}\n*Total Meninggal* : ${i.attributes.Kasus_Meni}\n=================\n`
				}
				reply(teks)
				break
		case 'topanime': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/anime/topanime?apikey=onlyonedeveloper`, {method: 'get'})
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Title:* : ${i.title}\n*Studio* : ${i.studio}\n*Rank* : ${i.rank}\n*Peak* : ${i.stats.peak}\n*Previously* : ${i.stats.previously}\n*Week On Top* : ${i.stats.weeksOnTop}\n*Status* : ${i.stats.status}\n*Stat* : ${i.stats.stat}\n=================\n`
				}
				reply(teks)
				break
		case 'coupleship': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/anime/coupleship?apikey=onlyonedeveloper`, {method: 'get'})
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Name:* : ${i.names}\n*Anime* : ${i.anime}\n*Rank* : ${i.rank}\n*Peak* : ${i.stats.peak}\n*Previously* : ${i.stats.previously}\n*Week On Top* : ${i.stats.weeksOnTop}\n*Status* : ${i.stats.status}\n*Stat* : ${i.stats.stat}\n=================\n`
				}
				reply(teks)
				break
		case 'doaharian': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/muslim/doaharian?apikey=onlyonedeveloper`, {method: 'get'})
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Nama Doa:* : ${i.title}\n*Arab* : ${i.arabic}\n*Latin* : ${i.latin}\n*Translation* : ${i.translation}\n=================\n`
				}
				reply(teks)
				break
		case 'niatsholat': // Case By Arga
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/muslim/niatshalat?apikey=onlyonedeveloper`, {method: 'get'})
				teks = '=================\n'
				for (let i of anu.result) {
				teks += `Sholat : ${i.name}\n*Arab* : ${i.arabic}\n*Latin* : ${i.latin}\n*Terjemah* : ${i.terjemahan}\n=================\n`
				}
				reply(teks.trim())
				break
		case 'bacaansholat': // Case By Arga
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/muslim/bacaanshalat?apikey=onlyonedeveloper`, {method: 'get'})
				teks = '=================\n'
				for (let i of anu.result) {
				teks += `Bacaan : ${i.name}\n*Arab* : ${i.arabic}\n*Latin* : ${i.latin}\n*Terjemah* : ${i.terjemahan}\n=================\n`
				}
				reply(teks.trim())
				break
		case 'jadwalsholat': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`kotanya mana bang?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/jadwalshalat?kota=${body.slice(14)}&apikey=onlyonedeveloper`, {method: 'get'})
				teks = '=================\n'
				for (let i of anu.result) {
				teks += `Tanggal : ${i.tanggal}\n*Imsyak* : ${i.imsyak}\n*Shubuh* : ${i.shubuh}\n*Terbit* : ${i.terbit}\n*Dhuha* : ${i.dhuha}\n*Dzuhur* : ${i.dzuhur}\n*Ashar* : ${i.ashr}\n*Magrib* : ${i.magrib}\n*Isya* : ${i.isya}\n=================\n`
				}
				reply(teks.trim())
				break
		case 'kisahnabi': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/kisahnabi?nabi=${body.slice(11)}&apikey=onlyonedeveloper`)
				buffer7 = await getBuffer(anu.result.nabi.image)
				teks = `*HASIL*\n\n*➸ Nama Nabi :* ${anu.result.nabi.nabi}\n*➸ Lahir :* ${anu.result.nabi.lahir}\n*➸ Umur :* ${anu.result.nabi.umur}\n*➸ Tempat :* ${anu.result.nabi.tempat}\n*➸ Kisah :* ${anu.result.nabi.kisah}`
				onlydev.sendMessage(from, buffer7, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: teks})
				break
		case 'tahlil': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/muslim/tahlil?apikey=onlyonedeveloper`, {method: 'get'})
				teks = '=================\n'
				for (let i of anu.result.data) {
				teks += `Title : ${i.title}\n*Arab* : ${i.arabic}\n*Terjemah* : ${i.translation}\n=================\n`
				}
				reply(teks.trim())
				break
		case 'ayatkursi': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/muslim/ayatkursi?apikey=onlyonedeveloper`)
				teks = `➸ *Arab* : ${anu.result.data.arabic}\n*➸ Latin :* ${anu.result.data.latin}\n*➸ Arti :* ${anu.result.data.translation}\n*➸ Tafsir :* ${anu.result.data.tafsir}`
				onlydev.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'covidglobal': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/covidworld?apikey=onlyonedeveloper`)
				teks = `➸ *Total Cases* : ${anu.result.totalCases}\n*➸ Recovered :* ${anu.result.recovered}\n*➸ Deaths :* ${anu.result.deaths}\n*➸ Active Cases :* ${anu.result.activeCases}\n*➸ Closed Cases :* ${anu.result.closedCases}\n*➸ Last Update :* ${anu.result.lastUpdate}`
				onlydev.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'hadits': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`kitab + nomor nya mana om? contoh: hadits muslim|116`)
				ct = body.slice(8)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/hadits?kitab=${ll1}&nomor=${ll2}&apikey=onlyonedeveloper`)
				teks = `➸ *Name Hadits* : ${anu.result.data.name}\n*➸ Number Hadits :* ${anu.result.data.contents.number}\n*➸ Arab :* ${anu.result.data.contents.arab}\n*➸ Latin :* ${anu.result.data.contents.id}`
				onlydev.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'quran': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`surah + ayat berapa mana om? note: surah harus berupa nomor, contoh: quran 1|2`)
				ct = body.slice(7)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/quran?surah=${ll1}&ayat=${ll2}&apikey=onlyonedeveloper`)
				teks = `➸ *Juz Ke* : ${anu.result.data.meta.juz}\n*➸ Text Arab :* ${anu.result.data.text.arab}\n*➸ Latin ID :* ${anu.result.data.text.transliteration.en}\n*➸ Arti ID :* ${anu.result.data.translation.id}\n*➸ Tafsir Pendek :* ${anu.result.data.tafsir.id.short}\n*➸ Tafsir Panjang :* ${anu.result.data.tafsir.id.long}\n*➸ Ayat Ke :* ${anu.result.data.surah.number}\n*➸ Nama Surah Arab Pendek :* ${anu.result.data.surah.name.short}\n*➸ Nama Surah Arab Panjang :* ${anu.result.data.surah.name.long}\n*➸ Nama Surah ID :* ${anu.result.data.surah.name.transliteration.id}\n*➸ Arti Nama Surah ID :* ${anu.result.data.surah.name.translation.id}\n*➸ Revelation Arab :* ${anu.result.data.surah.revelation.arab}\n*➸ Revelation ID :* ${anu.result.data.surah.revelation.id}\n*➸ Tafsir ID :* ${anu.result.data.surah.tafsir.id}`
				onlydev.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'github': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/github?user=${body.slice(8)}&apikey=onlyonedeveloper`)
				buffer7 = await getBuffer(anu.result.avatar_url)
				teks = `*HASIL*\n\n*➸ ID :* ${anu.result.id}\n*➸ Node ID :* ${anu.result.node_id}\n*➸ Gravatar ID :* ${anu.result.gravatar_id}\n*➸ Url :* ${anu.result.html_url}\n*➸ Type :* ${anu.result.type}\n*➸ Site Admin :* ${anu.result.site_admin}\n*➸ Name :* ${anu.result.name}\n*➸ Company :* ${anu.result.company}\n*➸ Blog :* ${anu.result.blog}\n*➸ Location :* ${anu.result.location}\n*➸ Email :* ${anu.result.email}\n*➸ Bio  :* ${anu.result.bio}\n*➸ Twitter Username :* ${anu.result.twitter_username}\n*➸ Public Repo :* ${anu.result.public_repos}\n*➸ Public Gists :* ${anu.result.public_gists}\n*➸ Followers :* ${anu.result.followers}\n*➸ Following :* ${anu.result.following}\n*➸ Create At :* ${anu.result.created_at}\n*➸ Update At :* ${anu.result.updated_at}`
				onlydev.sendMessage(from, buffer7, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: teks})
				break
		case 'cuaca': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`kotanya mana om?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/cuaca?kota=${body.slice(6)}&apikey=onlyonedeveloper`)
				teks = `➸ *Nama Kota* : ${anu.result.data.Nama}\n*➸ Longitude :* ${anu.result.data.Longitude}\n*➸ Latitude :* ${anu.result.data.Latitude}\n*➸ Suhu :* ${anu.result.data.Suhu}\n*➸ Angin :* ${anu.result.data.Angin}\n*➸ Kelembaban :* ${anu.result.data.Kelembaban}\n*➸ Cuaca :* ${anu.result.data.Cuaca}\n*➸ Keterangan :* ${anu.result.data.Keterangan}\n*➸ Udara :* ${anu.result.data.Udara}`
				onlydev.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'tiktokstalk': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`username tiktok mana om?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/tiktod/stalk/?username=${body.slice(13)}&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.user.avatarThumb)
				teks = `➸ *Username* : ${anu.result.user.uniqueId}\n*➸ Nickname :* ${anu.result.user.nickname}\n*➸ Bio :* ${anu.result.user.signature}\n*➸ Verified? :* ${anu.result.user.verified}\n*➸ Jumlah Follower :* ${anu.result.stats.followerCount}\n*➸ Jumlah Following :* ${anu.result.stats.followingCount}\n*➸ Jumlah Like :* ${anu.result.stats.heart}\n*➸ Total Video :* ${anu.result.stats.videoCount}`
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: teks})
				break
		case 'igstalk': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`username ig mana om?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/igstalk?u=${body.slice(9)}&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.data.profilehd)
				teks = `➸ *Fullname* : ${anu.result.data.fullname}\n*➸ Private :* ${anu.result.data.private}\n*➸ Verified? :* ${anu.result.data.verified}\n*➸ Bio :* ${anu.result.data.bio}\n*➸ Jumlah Follower :* ${anu.result.data.follower}\n*➸ Jumlah Following :* ${anu.result.data.following}\n*➸ Terhubung Ke FB? :* ${anu.result.data.conneted_fb}\n*➸ Video Post :* ${anu.result.data.videotimeline}\n*➸ Foto Post :* ${anu.result.data.timeline}`
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: teks})
				break
		case 'lacakip': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`ip nya mana bwang?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/iplookup?ip=${body.slice(9)}&apikey=onlyonedeveloper`)
				teks = `➸ *ip* : ${anu.result.ip}\n*➸ Country :* ${anu.result.country}\n*➸ Region :* ${anu.result.region}\n*➸ Latitude :* ${anu.result.latitude}\n*➸ Longtitude :* ${anu.result.longtitude}\n*➸ Timezone :* ${anu.result.timezone}\n*➸ Org :* ${anu.result.org}\n*➸ As :* ${anu.result.as}\n*➸ City :* ${anu.result.city}\n*➸ Country Code :* ${anu.result.countryCode}\n*➸ Zip Code :* ${anu.result.zip}\n*➸ Link GMaps :* ${anu.result.maps}`
				onlydev.sendMessage(from, teks, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
				break
		case 'dkasia': // Update By RzkyO 7 ItsmeikyXSec404
				if (args.length < 1) return reply(`nama drakorasia apaan bwang?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/drakorasia?search=${body.slice(8)}&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.thumb)
				hasil = `➸ *Title* : ${anu.result.title}\n*➸ Title Korea :* ${anu.result.titleKr}\n*➸ Year :* ${anu.result.year}\n*➸ Jumlah Episode :* ${anu.result.episode}\n*➸ Genre :* ${anu.result.genre}\n*➸ Durasi :* ${anu.result.duration}\n*➸ Network :* ${anu.result.network}\n*➸ Ringkasan :* ${anu.result.synopsis}\n*➸ Aktor :* ${anu.result.casters}`
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: hasil})
				break
		case 'manga': // Update By RzkyO 7 ItsmeikyXSec404
				if (args.length < 1) return reply(`nama anime nya apaan bwang?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/manga?search=${body.slice(6)}&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.thumb)
				hasil = `*Note:* : ${anu.result.note}\n*Title* : ${anu.result.title}\n*Description* : ${anu.result.description}\n*Name* : ${anu.result.name}\n*Type* : ${anu.result.type}\n*Author* : ${anu.result.author}\n*Genre* : ${anu.result.genre}\n*Rating* : ${anu.result.rating}\n*Released* : ${anu.result.released}\n*Status* : ${anu.result.status}`
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: hasil})
				teks = '=================\n'
				for (let i of anu.result.downloads) {
					teks += `*Date* : ${i.date}\n*Download Via* : ${i.title}\n*Link Download* : ${i.link}\n=================\n`
				}
				reply(teks)
				break
		case 'kusonime': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`nama anime nya apaang bwang?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/anime/kusonime?search=${body.slice(9)}&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.thumbs)
				hasil = `*Title:* : ${anu.result.title}\n*Title Jp* : ${anu.result.title_jp}\n*Genre* : ${anu.result.genre}\n*Season* : ${anu.result.season}\n*Producer* : ${anu.result.producer}\n*Type* : ${anu.result.type}\n*Total Episode* : ${anu.result.total_episode}\n*Rating* : ${anu.result.score}\n*Durasi* : ${anu.result.duration}\n*Released On* : ${anu.result.released_on}\n*Description* : ${anu.result.description}`
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: hasil})
				break
		case 'cekresijne': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`res nya apaan bwang?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/searchresi?courier=jne&awb=${body.slice(11)}&apikey=onlyonedeveloper`)
				hasil = `*Code Resi:* : ${anu.result.data.summary.awb}\n*Courier* : ${anu.result.data.summary.courier}\n*Service* : ${anu.result.data.summary.service}\n*Status* : ${anu.result.data.summary.status}\n*Date* : ${anu.result.data.summary.date}\n*Desc* : ${anu.result.data.summary.desc}\n*Harga* : ${anu.result.data.summary.amount}\n*Berat Barang* : ${anu.result.data.summary.weight}\n*Origin* : ${anu.result.data.detail.origin}\n*Destination* : ${anu.result.data.detail.destination}\n*Shipper* : ${anu.result.data.detail.shipper}\n*Receiver* : ${anu.result.data.detail.receiver}`
				onlydev.sendMessage(from, hasil, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'ini hasilnya kak'})
				teks = '=================\n'
				for (let i of anu.result.data.history) {
					teks += `*Date* : ${i.date}\n*Desc History* : ${i.desc}\n*Location* : ${i.location}\n=================\n`
				}
				reply(teks)
				break
		case 'playmp3': // masih ngebug api nya
				if (args.length < 1) return reply('Urlnya mana gan?')
				reply(`[❕] Loading`)
                anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/ytmp3?url=${body.slice(8)}&apikey=onlyonedeveloper`, {method: 'get'})
               if (anu.error) return reply(anu.error)
                 sck = `「 *YOUTUBE MP3 DOWNLOADER* 」\n\n*• Title:* ${anu.result.title}\n*• Filesize:* ${anu.result.filesize}\n*• Size:* ${anu.result.size}\n*• Video ID:* ${anu.result.videoId}\n*• Viewers:* ${anu.result.viewcount}\n*•Rating:* ${anu.result.rating}\n\n*TUNGGU SEBENTAR SHIZUKA LAGI KIRIM AUDIO NYA MOHON JANGAN SPAM*`
                bufferddd = await getBuffer(anu.result.thumb)
                onlydev.sendMessage(from, bufferddd, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: sck})
                liki = await getBuffer(anu.result.result)
                onlydev.sendMessage(from, liki, audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
                await limitAdd(sender)
				break
		case 'meme': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/random/meme?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				hasil = `➸ *Title* : ${anu.result.title}\n*➸ Author :* ${anu.result.author}\n*➸ Subreddit :* ${anu.result.subreddit}\n*➸ Post Link :* ${anu.result.post_link}`
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: hasil})
				break
		case 'randomwp': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/random/wallpaper?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'ini fotonya kak'})
				break
		case 'blackpink': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/randomimage/blackpink?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.result)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'ini fotonya kak'})
				break
		case 'hentaipict': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/hentai?apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.result)
				onlydev.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'ini fotonya kak'})
				break
		case 'quotes': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/quotes/kanye?apikey=onlyonedeveloper`)
				hasil = `➸ *Author* : ${anu.result.author}\n*➸ Text EN :* ${anu.result.text_en}\n*➸ Text ID :* ${anu.result.text_id}`
				onlydev.sendMessage(from, hasil, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'gabut': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/gabut?apikey=onlyonedeveloper`)
				hasil = `➸ *Activity* : ${anu.result.activity}\n*➸ Type :* ${anu.result.type}`
				onlydev.sendMessage(from, hasil, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'quotemuslim': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/randomquote/muslim?apikey=onlyonedeveloper`)
				hasil = `*➸ Quote :* ${anu.result.text_id}`
				onlydev.sendMessage(from, hasil, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'infogempa': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/infogempa?apikey=onlyonedeveloper`)
				hasil = `➸ *Waktu* : ${anu.result.Waktu}\n*➸ Lintang :* ${anu.result.Lintang}\n*➸ Bujur :* ${anu.result.Bujur}\n*➸ Magnitudo :* ${anu.result.Magnitudo}\n*➸ Kedalaman :* ${anu.result.Kedalaman}\n*➸ Wilayah :* ${anu.result.Wilayah}`
				onlydev.sendMessage(from, hasil, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'translate': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`apa yang mau di translate in dari b.indo ke b.inggris?`)
				reply(`[❕] Loading`)
				ct = body.slice(10)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/translate?text=${ct}&to=en&apikey=onlyonedeveloper`)
				hasil = `➸ *Bahasa IND* : ${anu.hasil.data.origin}\n*➸ Bahasa ENG :* ${anu.hasil.data.result}`
				onlydev.sendMessage(from, hasil, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }, caption: 'Nih hasilnya kak...'})
				break
		case 'faktaunik': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/faktaunik?apikey=onlyonedeveloper`, {method: 'get'})
				reply(anu.result.result)
				break
		case 'hilih': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`textnya mana om?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/hilih?kata=${body.slice(6)}&apikey=onlyonedeveloper`, {method: 'get'})
				reply(anu.result.result)
				break
		case 'gombal': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/random/katakatagombal?apikey=onlyonedeveloper`, {method: 'get'})
				reply(anu.result.quote)
				break
		case 'artinama': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/artinama?q=${body.slice(9)}&apikey=onlyonedeveloper`, {method: 'get'})
				reply(anu.result.result)
				break
		case 'lirik': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`nama lagunya mana om?`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/liriklagu?lagu=${body.slice(6)}&apikey=onlyonedeveloper`, {method: 'get'})
				reply(anu.result.results)
				break
		case 'chord': // Update By RzkyO & ItsmeikyXSec404
				if (args.length < 1) return reply(`masukin nama lagunya om`)
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/chordlagu?lagu=${body.slice(7)}&apikey=onlyonedeveloper`, {method: 'get'})
				reply(anu.result.result)
				break
		case 'simisimi': // Update By RzkyO & ItsmeikyXSec404
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/simisimi?text=${body.slice(9)}&apikey=onlyonedeveloper`)
				reply(anu.result.success)
				break
		case 'kodepos': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`kotanya mana bang?`)
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/kodepos?kota=${body.slice(8)}&apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Provinsi:* : ${i.province}\n*City* : ${i.city}\n*Kecamatan* : ${i.subdistrict}\n*Kota* : ${i.urban}\n*Kode Pos* : ${i.postalcode}\n=================\n`
				}
				reply(teks)
				break
		case 'liputan6': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/news/liputan6?apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Title:* : ${i.title}\n*Link* : ${i.link}\n*Date* : ${i.isoDate}\n*Description* : ${i.description}\n=================\n`
				}
				reply(teks)
				break
		case 'cnnnews': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/news/cnnnews?apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Title:* : ${i.title}\n*Link* : ${i.link}\n*Content* : ${i.contentSnippet}\n*Date* : ${i.isoDate}\n=================\n`
				}
				reply(teks)
				break
		case 'republika': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/news/republika?apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Creator:* : ${i.creator}\n*Title* : ${i.title}\n*Link* : ${i.link}\n*Categori* : ${i.categories}\n*Description* : ${i.description}\n*Date* : ${i.isoDate}\n=================\n`
				}
				reply(teks)
				break
		case 'temponews': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/news/temponews?apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Title:* : ${i.title}\n*Link* : ${i.link}\n*Content* : ${i.content}\n*Date* : ${i.isoDate}\n=================\n`
				}
				reply(teks)
				break
		case 'kumparannews': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/news/kumpurannews?apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Creator:* : ${i.creator}\n*Title* : ${i.title}\n*Link* : ${i.link}\n*Categori* : ${i.categories}\n*Description* : ${i.description}\n*Date* : ${i.isoDate}\n=================\n`
				}
				reply(teks)
				break
		case 'lazymedia': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`mau nyari berita apaan bang?`)
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/news/lazymedia?search=${body.slice(10)}&apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.hasil.result) {
					teks += `*Author:* : ${i.author}\n*Title* : ${i.title}\n*Tag* : ${i.tag}\n*Time* : ${i.time}\n*Description* : ${i.desc}\n*Key* : ${i.key}\n=================\n`
				}
				reply(teks)
				break
		case 'resepmakanan': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`mau nyari resep makanan apaan bang?`)
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/resepmasakan?q=${body.slice(13)}&apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.hasil.results) {
					teks += `*Title* : ${i.title}\n*Key* : ${i.key}\n*Time* : ${i.times}\n*Serving* : ${i.serving}\n*Difficulty* : ${i.difficulty}\n=================\n`
				}
				reply(teks)
				break
		case 'playstore': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`mau nyari game apaan bwang?`)
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/googleplay?q=${body.slice(10)}&apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.result.data.results) {
					teks += `*Title* : ${i.title}\n*App ID* : ${i.appId}\n*Url* : ${i.url}\n*Developer* : ${i.developer}\n*Price Text* : ${i.priceText}\n*Price?* : ${i.price}\n*Free?* : ${i.free}\n*Summary?* : ${i.summary}\n*Score Text?* : ${i.scoreText}\n*Score?* : ${i.score}\n=================\n`
				}
				reply(teks)
				break
		case 'joox': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`mau nyari apaan bwang di joox?`)
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/joox?q=${body.slice(5)}&apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.result.data) {
					teks += `*Title* : ${i.lagu}\n*Album* : ${i.album}\n*Penyanyi* : ${i.penyanyi}\n*Publish Date* : ${i.publish}\n=================\n`
				}
				reply(teks)
				break
		case 'infofilm': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`mau nyari apaan bwang di joox?`)
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/infofilm?q=${body.slice(10)}&apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.hasil.result) {
					teks += `*Title* : ${i.title}\n*Rating* : ${i.rating}\n*Episode* : ${i.episode}\n*Movie ID* : ${i.movieId}\n*Views* : ${i.detail.views}\n*Duration* : ${i.detail.duration}\n*Release* : ${i.detail.release}\n*Dscription* : ${i.detail.description}\n=================\n`
				}
				reply(teks)
				break
		case 'infofilm2': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`mau nyari apaan bwang di joox?`)
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/country/infofilm?search=${body.slice(11)}&apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.hasil.result) {
					teks += `*Title* : ${i.title}\n*Rating* : ${i.rating}\n*Quality* : ${i.quality}\n*Movie ID* : ${i.movieId}\n*Trailer* : ${i.detail.trailer}\n*Views* : ${i.detail.views}\n*Genre* : ${i.detail.genre}\n*Director* : ${i.detail.director}\n*Aktor* : ${i.detail.actors}\n*Country* : ${i.detail.country}\n*Duration* : ${i.detail.duration}\n*Release* : ${i.detail.release}\n*Description* : ${i.detail.description}\n=================\n`
				}
				reply(teks)
				break
		case 'lk21': // Update By RzkyO & ItsmeikyXSec404	
				onlydev.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`mau nyari apaan bwang di joox?`)
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/lk21?query=${body.slice(5)}&apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.hasil.result) {
					teks += `*Title* : ${i.title}\n*Genre* : ${i.genre}\n*Rating* : ${i.rating}\n*Duration* : ${i.duration}\n*Quality* : ${i.quality}\n*Trailer* : ${i.trailer}\n*Watch* : ${i.watch}\n=================\n`
				}
				reply(teks)
				break
		case 'ytsearch': // masih ngebug
				onlydev.updatePresence(from, Presence.composing) 
				if (args.length < 1) return reply(`mau nyari apaan bwang di yt?`)
				reply(`[❕] Loading`)
				asu = await fetchJson(`https://onlydevcity.herokuapp.com/api/ytsearch?q=${body.slice(9)}&apikey=onlyonedeveloper`)
				teks = '=================\n'
				for (let i of asu.hasil.results) {
					teks += `*Title:* : ${i.video.title}\n*Url* : ${i.video.url}\n*Duration* : ${i.video.duration}\n*Description* : ${i.video.description}\n*Published* : ${i.video.published}\n*Views* : ${i.video.views}\n=================\n`
				}
				reply(teks)
				break
		case 'kbbi':			
				if (args.length < 1) return reply('Apa yang mau dicari di kbbi kak?')
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/kbbi?kata=${body.slice(6)}&apikey=onlyonedeveloper`, {method: 'get'})
				reply('Menurut Kbbi:\n\n'+anu.result.arti)
				break
				case 'runtime':
				onlydev.updatePresence(from, Presence.composing) 
				runtime = process.uptime()
				wah = `-{ *𝙍𝙐𝙉𝙏𝙄𝙈𝙀* }-\n\n\`\`\`${kyun(runtime)}\`\`\``
                onlydev.sendMessage(from, wah, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.com`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝙍𝙐𝙉𝙏𝙄𝙈𝙀", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1200, "width": 1100, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
			   break
	     case 'return':
			   return onlydev.sendMessage(from, JSON.stringify(eval(args.join(''))), text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.com`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "_SelfBot OnlyDev City_", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1200, "width": 1100, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('image/odc.jpeg')} } }})
		       break
		case 'payment':
		case 'payments':
			 var itsme = `0@s.whatsapp.net`
			 var split = `*PAYMENT-INFO*`
				var selepbot = {
					contextInfo: {
				    participant: itsme,
			        quotedMessage: {
				    extendedTextMessage: {
					text: split,
					}
					}
					}
				    }
				onlydev.sendMessage(from, `*──「 PAYMENT 」──*\n*Premium : 15k/Bulan*\n*Sewa Bot : 10K*\n- Ovo : 081-2818-72699\n- Pulsa : 0812-8187-2699( +5K )\n\n*──「 OnlyDev City シ︎ 」──* `, MessageType.text, selepbot)
				break
			case 'chatlist':
			case 'cekchat':
				onlydev.updatePresence(from, Presence.composing)
				var itsme = `0@s.whatsapp.net`
				var split = `𝘾𝙀𝙆 𝘼𝙇𝙇-𝘾𝙃𝘼𝙏`
				var selepbot = {
					contextInfo: {
					participant: itsme,
					quotedMessage: {
					extendedTextMessage: {
					text: split,
				}
				}
				}
				}
				teks = `Total : ${totalchat.length}`
				onlydev.sendMessage(from, teks, MessageType.text, selepbot)
				break
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
//SC BY MHANKBARBAR
//FREE WEB API BY ITSMEIKYXSEC404
//RECODE BY ITSMEIKYXSEC404 & RIZKYO
//CUMAN RECODE BANG
