//export const fftInput = '03036732577212944063491565474664'
export const fftInput = '59728776137831964407973962002190906766322659303479564518502254685706025795824872901465838782474078135479504351754597318603898249365886373257507600323820091333924823533976723324070520961217627430323336204524247721593859226704485849491418129908885940064664115882392043975997862502832791753443475733972832341211432322108298512512553114533929906718683734211778737511609226184538973092804715035096933160826733751936056316586618837326144846607181591957802127283758478256860673616576061374687104534470102346796536051507583471850382678959394486801952841777641763547422116981527264877636892414006855332078225310912793451227305425976335026620670455240087933409';
export const fftPattern = '0, 1, 0, -1'
export const fftPatternArray = fftPattern.split(',').map(Number);
export const fftcrazyInput = fftInput.repeat(10000).substring(Number(fftInput[0]+fftInput[1]+fftInput[2]+fftInput[3]+fftInput[4]+fftInput[5]+fftInput[6]));
export const crazy = Number(''+fftInput[0]+fftInput[1]+fftInput[2]+fftInput[3]+fftInput[4]+fftInput[5]+fftInput[6]);

