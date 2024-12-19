
from transformers import AutoTokenizer, AutoModelForCausalLM 


model_type = "/opt/anaconda3/lib/python3.12/site-packages"


tokenizer = AutoTokenizer.from_pretrained(model_type)
model = AutoModelForCausalLM.from_pretrained(model_type)

input_text = "Test Test Something"
res = tokenizer(input_text)
print(res)