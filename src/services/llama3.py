from transformers import AutoTokenizer, AutoModelForCausalLM 

model_type = "meta-llama/Llama-3.3-70B-Instruct"

tokenizer = AutoTokenizer.from_pretrained(model_type)
model = AutoModelForCausalLM.from_pretrained(model_type)

input_text = "Test Test Something"
res = tokenizer(input_text)
print(res)