from diffusers import DiffusionPipeline
import torch

pipeline = DiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5", torch_dtype=torch.float16)
pipeline.to("cuda")

image = pipeline("An image of a squirrel in Picasso style").images[0]
    
image.save("astronaut_rides_horse.png")
