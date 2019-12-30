﻿let ImageClassifiers = new Object();

function initImageClassifierVidML5(Hash, DotNet, model, video, options)
{
    let icf;
    if (options != null)
        icf = ml5.imageClassifier(model, video, options, ml5ModelLoaded.bind(DotNet));
    else
        icf = ml5.imageClassifier(model, video, ml5ModelLoaded.bind(DotNet));

    ImageClassifiers[Hash] = model;
}
function initImageClassifierStrML5(DotNet, Hash, model, opt)
{
    let icf;
    if (opt != null)
        icf = ml5.imageClassifier(model, opt, ml5ModelLoaded.bind(DotNet));
    else
        icf = ml5.imageClassifier(model, ml5ModelLoaded.bind(DotNet));

    ImageClassifiers[Hash] = icf;

}
function destroyImageClassifier(hash)
{
    delete ImageClassifiers[hash];
}

function ml5ModelLoaded()
{
    this.invokeMethodAsync("ICFML", "__ModelLoaded__");
}

function imageClassifierClassify(hash,DotNet,image,noOfClasses)
{
    if (noOfClasses != null)
    {
        ImageClassifiers[hash].classify(image, noOfClasses, imageResultClassification.bind(DotNet));
    }
    else
    {
        ImageClassifiers[hash].classify(image, imageResultClassification.bind(DotNet));
    }


}
function imageResultClassification(err,res)
{
    this.invokeMethodAsync("ICFCF", err, res);

}