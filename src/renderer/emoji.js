import PWL from "./pwl";
import fs from 'fs';
import path from 'path';

let rootPath = process.env.NODE_ENV == 'development' ? 
    path.resolve(__dirname, '..', '..') :
    process.resourcesPath
let config = JSON.parse(fs.readFileSync(path.resolve(rootPath, 'config.json')))
config.domain = 'fishpi.cn'

let emojis = {
    "doge": {
        "type": "vditor",
        "url": "https://cdn.jsdelivr.net/npm/vditor@3.8.7/dist/images/emoji/doge.png"
    },
    "trollface": {
        "type": "vditor",
        "url": "https://cdn.jsdelivr.net/npm/vditor@3.8.7/dist/images/emoji/trollface.png"
    },
    "huaji": {
        "type": "vditor",
        "url": "https://cdn.jsdelivr.net/npm/vditor@3.8.7/dist/images/emoji/huaji.gif"
    },
    "trollface": {
        "type": "vditor",
        "url": "https://cdn.jsdelivr.net/npm/vditor@3.8.7/dist/images/emoji/trollface.png"
    },
    "octocat": {
        "type": "vditor",
        "url": "https://cdn.jsdelivr.net/npm/vditor@3.8.7/dist/images/emoji/octocat.png"
    },
    "wulian": {
        "type": "vditor",
        "url": "https://cdn.jsdelivr.net/npm/vditor@3.8.7/dist/images/emoji/wulian.png"
    },
    "smile": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/smile.png`
    },
    "laughing": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/laughing.png`
    },
    "blush": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/blush.png`
    },
    "smiley": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/smiley.png`
    },
    "relaxed": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/relaxed.png`
    },
    "smirk": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/smirk.png`
    },
    "heart_eyes": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/heart_eyes.png`
    },
    "kissing_heart": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/kissing_heart.png`
    },
    "kissing_closed_eyes": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/kissing_closed_eyes.png`
    },
    "flushed": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/flushed.png`
    },
    "relieved": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/relieved.png`
    },
    "satisfied": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/satisfied.png`
    },
    "grin": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/grin.png`
    },
    "wink": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/wink.png`
    },
    "stuck_out_tongue_winking_eye": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/stuck_out_tongue_winking_eye.png`
    },
    "stuck_out_tongue_closed_eyes": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/stuck_out_tongue_closed_eyes.png`
    },
    "grinning": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/grinning.png`
    },
    "kissing": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/kissing.png`
    },
    "kissing_smiling_eyes": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/kissing_smiling_eyes.png`
    },
    "stuck_out_tongue": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/stuck_out_tongue.png`
    },
    "sleeping": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/sleeping.png`
    },
    "worried": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/worried.png`
    },
    "frowning": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/frowning.png`
    },
    "anguished": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/anguished.png`
    },
    "open_mouth": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/open_mouth.png`
    },
    "grimacing": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/grimacing.png`
    },
    "confused": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/confused.png`
    },
    "hushed": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/hushed.png`
    },
    "expressionless": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/expressionless.png`
    },
    "unamused": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/unamused.png`
    },
    "sweat_smile": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/sweat_smile.png`
    },
    "sweat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/sweat.png`
    },
    "disappointed_relieved": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/disappointed_relieved.png`
    },
    "weary": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/weary.png`
    },
    "pensive": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/pensive.png`
    },
    "disappointed": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/disappointed.png`
    },
    "confounded": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/confounded.png`
    },
    "fearful": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/fearful.png`
    },
    "cold_sweat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/cold_sweat.png`
    },
    "persevere": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/persevere.png`
    },
    "cry": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/cry.png`
    },
    "sob": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/sob.png`
    },
    "joy": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/joy.png`
    },
    "astonished": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/astonished.png`
    },
    "scream": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/scream.png`
    },
    "tired_face": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/tired_face.png`
    },
    "angry": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/angry.png`
    },
    "rage": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/rage.png`
    },
    "triumph": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/triumph.png`
    },
    "sleepy": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/sleepy.png`
    },
    "yum": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/yum.png`
    },
    "mask": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/mask.png`
    },
    "sunglasses": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/sunglasses.png`
    },
    "dizzy_face": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/dizzy_face.png`
    },
    "imp": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/imp.png`
    },
    "smiling_imp": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/smiling_imp.png`
    },
    "neutral_face": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/neutral_face.png`
    },
    "no_mouth": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/no_mouth.png`
    },
    "innocent": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/innocent.png`
    },
    "alien": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/alien.png`
    },
    "yellow_heart": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/yellow_heart.png`
    },
    "blue_heart": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/blue_heart.png`
    },
    "purple_heart": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/purple_heart.png`
    },
    "heart": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/heart.png`
    },
    "green_heart": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/green_heart.png`
    },
    "broken_heart": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/broken_heart.png`
    },
    "heartbeat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/heartbeat.png`
    },
    "heartpulse": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/heartpulse.png`
    },
    "two_hearts": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/two_hearts.png`
    },
    "revolving_hearts": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/revolving_hearts.png`
    },
    "cupid": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/cupid.png`
    },
    "sparkling_heart": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/sparkling_heart.png`
    },
    "sparkles": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/sparkles.png`
    },
    "star": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/star.png`
    },
    "star2": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/star2.png`
    },
    "dizzy": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/dizzy.png`
    },
    "boom": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/boom.png`
    },
    "collision": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/collision.png`
    },
    "anger": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/anger.png`
    },
    "exclamation": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/exclamation.png`
    },
    "question": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/question.png`
    },
    "grey_exclamation": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/grey_exclamation.png`
    },
    "grey_question": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/grey_question.png`
    },
    "zzz": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/zzz.png`
    },
    "dash": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/dash.png`
    },
    "sweat_drops": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/sweat_drops.png`
    },
    "notes": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/notes.png`
    },
    "musical_note": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/musical_note.png`
    },
    "fire": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/fire.png`
    },
    "poop": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/poop.png`
    },
    "+1": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/%2B1.png`
    },
    "thumbsup": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/thumbsup.png`
    },
    "-1": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/-1.png`
    },
    "thumbsdown": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/thumbsdown.png`
    },
    "ok_hand": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/ok_hand.png`
    },
    "punch": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/punch.png`
    },
    "facepunch": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/facepunch.png`
    },
    "fist": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/fist.png`
    },
    "v": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/v.png`
    },
    "wave": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/wave.png`
    },
    "hand": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/hand.png`
    },
    "raised_hand": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/raised_hand.png`
    },
    "open_hands": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/open_hands.png`
    },
    "point_up": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/point_up.png`
    },
    "point_down": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/point_down.png`
    },
    "point_left": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/point_left.png`
    },
    "point_right": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/point_right.png`
    },
    "raised_hands": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/raised_hands.png`
    },
    "pray": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/pray.png`
    },
    "point_up_2": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/point_up_2.png`
    },
    "clap": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/clap.png`
    },
    "muscle": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/muscle.png`
    },
    "couple": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/couple.png`
    },
    "family": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/family.png`
    },
    "two_men_holding_hands": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/two_men_holding_hands.png`
    },
    "two_women_holding_hands": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/two_women_holding_hands.png`
    },
    "dancer": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/dancer.png`
    },
    "dancers": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/dancers.png`
    },
    "ok_woman": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/ok_woman.png`
    },
    "no_good": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/no_good.png`
    },
    "information_desk_person": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/information_desk_person.png`
    },
    "raising_hand": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/raising_hand.png`
    },
    "bride_with_veil": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/bride_with_veil.png`
    },
    "person_with_pouting_face": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/person_with_pouting_face.png`
    },
    "person_frowning": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/person_frowning.png`
    },
    "bow": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/bow.png`
    },
    "couplekiss": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/couplekiss.png`
    },
    "couple_with_heart": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/couple_with_heart.png`
    },
    "massage": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/massage.png`
    },
    "haircut": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/haircut.png`
    },
    "nail_care": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/nail_care.png`
    },
    "boy": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/boy.png`
    },
    "girl": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/girl.png`
    },
    "woman": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/woman.png`
    },
    "man": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/man.png`
    },
    "baby": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/baby.png`
    },
    "older_woman": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/older_woman.png`
    },
    "older_man": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/older_man.png`
    },
    "person_with_blond_hair": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/person_with_blond_hair.png`
    },
    "man_with_gua_pi_mao": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/man_with_gua_pi_mao.png`
    },
    "man_with_turban": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/man_with_turban.png`
    },
    "construction_worker": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/construction_worker.png`
    },
    "cop": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/cop.png`
    },
    "angel": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/angel.png`
    },
    "princess": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/princess.png`
    },
    "smiley_cat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/smiley_cat.png`
    },
    "smile_cat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/smile_cat.png`
    },
    "heart_eyes_cat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/heart_eyes_cat.png`
    },
    "kissing_cat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/kissing_cat.png`
    },
    "smirk_cat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/smirk_cat.png`
    },
    "scream_cat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/scream_cat.png`
    },
    "crying_cat_face": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/crying_cat_face.png`
    },
    "joy_cat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/joy_cat.png`
    },
    "pouting_cat": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/pouting_cat.png`
    },
    "japanese_ogre": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/japanese_ogre.png`
    },
    "japanese_goblin": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/japanese_goblin.png`
    },
    "see_no_evil": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/see_no_evil.png`
    },
    "hear_no_evil": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/hear_no_evil.png`
    },
    "speak_no_evil": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/speak_no_evil.png`
    },
    "guardsman": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/guardsman.png`
    },
    "skull": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/skull.png`
    },
    "feet": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/feet.png`
    },
    "lips": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/lips.png`
    },
    "kiss": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/kiss.png`
    },
    "droplet": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/droplet.png`
    },
    "ear": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/ear.png`
    },
    "eyes": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/eyes.png`
    },
    "nose": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/nose.png`
    },
    "tongue": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/tongue.png`
    },
    "love_letter": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/love_letter.png`
    },
    "bust_in_silhouette": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/bust_in_silhouette.png`
    },
    "busts_in_silhouette": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/busts_in_silhouette.png`
    },
    "speech_balloon": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/speech_balloon.png`
    },
    "thought_balloon": {
        "type": "emoji",
        "url": `https://${config.domain}/emoji/graphics/thought_balloon.png`
    }
}

let faces = JSON.parse(localStorage.getItem('faces')) || {};
faces['^syncs'] = faces['^syncs'] || { type: 'urls', url: []}
emojis = Object.assign(emojis, faces);

const emojiNames = Object.keys(emojis);

export default {
    async load(token) {
        let pwl = new PWL(token);
        let data = await pwl.emoji();
        emojis['^syncs'] = faces['^syncs'] = { type: 'syncs', url: data }
    },
    search(name) {
        return emojiNames.filter(e => e.startsWith(name)).slice(0, 5).map(e => ({ name: e, url: emojis[e].url }));
    },
    get (name) {
        return emojis[name] ? `:${name}:` : `![图片表情](${name})`;
    },
    getUrl (name) {
        return emoji[name].url;
    },
    async sync (token) {
        if (!token) return;
        let pwl = new PWL(token);
        await pwl.syncEmoji(faces['^syncs'].url);
    },
    push (name, url) {
        if (!name && faces['^syncs'].url.indexOf(url) < 0) {
            faces['^syncs'].url.push(url);
            emojis['^syncs'].url = faces['^syncs'].url;
            return true;
        }
        else if(!name) return false;
        if (emojiNames.indexOf(name) >= 0) return false;
        emojis[name] = faces[name] = {
            type: 'face',
            url
        };
        emojiNames.push(name);
        return true;
    },
    remove (url, token) {
        faces['^syncs'].url.splice(faces['^syncs'].url.indexOf(url), 1);
        emojis['^syncs'].url = faces['^syncs'].url
        this.save(token);
        return emojis['^syncs'].url;
    },
    save (token) {
        localStorage.setItem('faces', JSON.stringify(faces));
        if (token) this.sync(token);
    },
    get urls () {
        return emojis['^syncs'].url;
    },
    list (type) {
        return emojiNames.filter(e => emojis[e].type == type).map(e => ({ name: e, url: emojis[e].url }));
    }
}