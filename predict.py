import torch
from resnet import ResNet, ResidualBlock
from PIL import Image
from torchvision import transforms

# comment this out if we have a gpu
model = ResNet(ResidualBlock)
model.load_state_dict(torch.load("./model.pt", map_location=torch.device('cpu')))

def pre_image(image_path):
    img = Image.open(image_path)
    mean = [0.485, 0.456, 0.406] 
    std = [0.229, 0.224, 0.225]
    transform = transforms.Compose([transforms.Resize(256),
            transforms.CenterCrop(256),
            transforms.ToTensor(),
            transforms.Normalize(mean, std),])
    # get normalized image
    img_normalized = transform(img).float()
    img_normalized = img_normalized.unsqueeze_(0)
    #img_normalized = img_normalized.to(device)

    return img_normalized
    
image = pre_image("./testimage.jpg")

with torch.no_grad():
    model.eval()  
    output = model(image)
    index = output.data.cpu().numpy().argmax()
    print(index)
    #index = output.data.cpu().numpy().argmax()
    #classes = train_ds.classes
    #class_name = classes[index]







