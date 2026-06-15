function main(args) {
    // Normalize input to an array of [number, number] tuples.
    let input = null;
    if (Array.isArray(args)) {
        input = args;
    } else if (Array.isArray(args.body)) {
        input = args.body;
    } else if (typeof args.__ow_body === 'string') {
        try {
            input = args.__ow_body ? JSON.parse(args.__ow_body) : null;
        } catch (err) {
            return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: { error: 'Invalid JSON' } };
        }
    } else if (Array.isArray(args.__ow_body)) {
        input = args.__ow_body;
    } else if (Array.isArray(args.input)) {
        input = args.input;
    } else if (Array.isArray(args.data)) {
        input = args.data;
    } else if (args && typeof args === 'object') {
        // Support encoded numeric keys from some invocations
        const numericKeys = Object.keys(args).filter(k => /^\d+$/.test(k));
        if (numericKeys.length > 0) {
            input = numericKeys.map(k => args[k]);
        }
    }

    if (!Array.isArray(input)) {
        return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: { error: 'Expected JSON body as array of [number, number] tuples' } };
    }

    if (!input.every(item => Array.isArray(item) && item.length === 2 && item.every(n => typeof n === 'number'))) {
        return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: { error: 'Expected JSON body as array of [number, number] tuples' } };
    }

    const answerWeights = [
        { metric: 'osus', weights: [1, 0.5, 0] },
        { metric: 'osus', weights: [0, 0.5, 1] },
        { metric: 'osus', weights: [0, 0.5, 1] },
        { metric: 'fvmv', weights: [1, 0, 0.5] },
        { metric: 'fvmv', weights: [0, 1] },
        { metric: 'hq', weights: [1, 0] },
        { metric: 'hq', weights: [1, 0] },
    ];

    let leaningsSums = [0, 0, 0];
    let leaningsCounts = [0, 0, 0];

    const leaningsIndices = { osus: 0, fvmv: 1, hq: 2 };

    for (let i = 0; i < input.length; i++) {
        const [answerWeightsIndex, weightIndex] = input[i];
        const aw = answerWeights[answerWeightsIndex];
        if (!aw) continue;
        const { metric, weights } = aw;
        const leaningsIndex = leaningsIndices[metric];
        const weightVal = weights[weightIndex] ?? 0;
        leaningsSums[leaningsIndex] += weightVal;
        leaningsCounts[leaningsIndex] += 1;
    }

    const leaningsResult = leaningsSums.map((sum, index) => (leaningsCounts[index] > 0 ? sum / leaningsCounts[index] : 0));

    const profiles = [
        { leanings: [0.5, 1, 0], blurb: "Hot-headed and impressionable. She's entrusted with big responsibilities, and the prospects of her job are safeguarded by her pure intentions.", index: 0 },
        { leanings: [0.5, 0, 0], blurb: "Pragmatic and takes things as they come. She's someone who would make a good audience for anyone with a story to tell.", index: 1 },
        { leanings: [1, 0, 1], blurb: "She prefers not to be provoked while researching, but is blunt and insistent when she sets out to execute her theories.", index: 2 },
        { leanings: [0.5, 1, 1], blurb: "Diligent and loyal. Her veneer of etiquette and refinement sometimes gives way to her vulgar posturing.", index: 3 },
        { leanings: [0, 1, 1], blurb: "She makes sure her environment and those around her are up to par. Despite being the powerful lady of the mansion, she has simple and fleeting desires.", index: 4 },
        { leanings: [1, 1, 1], blurb: "Her direct demeanor indicates that her flamboyance is the real deal and not just for show. She values her time very much, and would prefer only spending it on something worthwhile.", index: 5 },
        { leanings: [1, 1, 0], blurb: "Reliable if given tasks well-suited for her skills, but may struggle with ambiguity. She is unfazed by situations that would be embarrassing for others, and operates with the gumption of someone without any standards to measure up against.", index: 6 },
        { leanings: [0.5, 0, 1], blurb: "Despite being someone with power and influence, she isn't very sought-after, nor would anyone want to seek her out in the first place. She answers to no one, and when she does care for someone or something, she won't directly show it.", index: 7 },
        { leanings: [1, 0, 0], blurb: "Errand girl who can always use some guidance. She takes her responsibility seriously and is excessively wary of missteps, perhaps owing to her previous experience as a servant.", index: 8 },
        { leanings: [0, 0, 0], blurb: "Aloof and amicable. Once she goes on a train of thought, you can't tell if she's being genuinely insightful or just full of whimsy.", index: 9 },
        { leanings: [0, 0, 1], blurb: "A serious journalist. It's easy to let your guard down around her seemingly-innocent line of questioning, but she's always hoping to land a scoop whether or not it's to your benefit.", index: 10 },
        { leanings: [0, 1, 0], blurb: "An explorer borne out of boredom. She has the spiritual freedom that comes with being in a household with parental guardians.", index: 11 },
    ];

    let closestMatch = null;
    let runnerUp = null;
    for (const profile of profiles) {
        const distance = Math.sqrt(profile.leanings.reduce((sum, val, index) => sum + Math.pow(val - leaningsResult[index], 2), 0));
        if (!closestMatch || distance < closestMatch.distance) {
            runnerUp = closestMatch;
            closestMatch = { profile, distance };
        } else if (!runnerUp || distance < runnerUp.distance) {
            runnerUp = { profile, distance };
        }
    }

    const response = {
        closestMatchCharacter: closestMatch ? closestMatch.profile.index : 0,
        runnerUpCharacter: runnerUp ? runnerUp.profile.index : 0,
        closestMatchBlurb: closestMatch ? closestMatch.profile.blurb : '',
        runnerUpBlurb: runnerUp ? runnerUp.profile.blurb : '',
        leanings: leaningsResult,
    };

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: response };
}
