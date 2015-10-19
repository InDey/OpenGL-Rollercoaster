
#version 330 core


/*
	This is the shader for loading the Model as Ice (with refraction and reflection)  
	You should use the advanced.frag shader for the lighting.

	You can play around with this shader, this was just for fun to do some basic reflection
	and refraction but it does not have any lighting activated at the moment
*/
struct Material {
    sampler2D texture_diffuse1;
    sampler2D texture_specular1;
    sampler2D texture_reflection1;
    float shininess;
}; 
/* Note: because we now use a material struct again you want to change your
mesh class to bind all the textures using material.texture_diffuseN instead of
texture_diffuseN. */

struct PointLight {
    vec3 position;
    
    float constant;
    float linear;
    float quadratic;
    
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

#define NR_POINT_LIGHTS 2


in vec3 Normal;
in vec3 Position;
in vec2 TexCoords;

uniform vec3 cameraPos;
uniform samplerCube skybox;

out vec4 color;

uniform vec3 viewPos;
uniform PointLight pointLights[NR_POINT_LIGHTS];
uniform Material material;

// Function prototypes
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 Position, vec3 viewDir);


void main()
{          
   
    // Diffuse
    vec4 diffuse_color = texture(material.texture_diffuse1, TexCoords);
    // Reflection
    vec3 I = normalize(Position - cameraPos);
    vec3 R = reflect(I, normalize(Normal));
    float reflect_intensity = texture(material.texture_reflection1, TexCoords).r;
    vec4 reflect_color;
    if(reflect_intensity > 0.1) // Only sample reflections when above a certain treshold
        reflect_color = texture(skybox, R) * reflect_intensity;
    // Add a bit of shiny reflection
    float ratio = 1.00 / 1.52;
    vec3 R1 = refract(I, normalize(Normal), ratio);
	vec3 R2 = reflect(I, normalize(Normal));
    // Combine them
    //color = mix(diffuse_color + reflect_color,  texture(skybox, R), .2);
	color = mix(texture(skybox, R1),  texture(skybox, R2), .5);
    //color = diffuse_color+reflect_color;
	//color = texture(material.texture_diffuse1, TexCoords);
	
	
	//vec3 result;
    //vec3 viewDir = normalize(viewPos - Position);
    //vec3 norm = normalize(Normal);
    
	
    //for(int i = 0; i < NR_POINT_LIGHTS; i++)
    //    result += CalcPointLight(pointLights[i], norm, Position, viewDir);
        
    //color = vec4(result, 1.0f) ;
}


// Calculates the color when using a point light.
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 Position, vec3 viewDir)
{
     vec3 lightDir = normalize(light.position - Position);
    // Diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);
    // Specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    // Attenuation
    float distance = length(light.position - Position);
    float attenuation = 1.0f / (light.constant + light.linear * distance + light.quadratic * (distance * distance));    
    // Combine results
    vec3 ambient = light.ambient * vec3(texture(material.texture_diffuse1, TexCoords));
    vec3 diffuse = light.diffuse * diff * vec3(texture(material.texture_diffuse1, TexCoords));
    vec3 specular = light.specular * spec * vec3(texture(material.texture_specular1, TexCoords));
    ambient *= attenuation;
    diffuse *= attenuation;
    specular *= attenuation;
    return (ambient + diffuse + specular);
}