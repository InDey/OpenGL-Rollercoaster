// this is an extra header file to sort all my particualar header functions

//includes 
#include "rc_spline.h"

/* 
x = B.x+2*B.x*u^3-2*C.x*u^3-A.x*t*u^3-B.x*t*u^3+C.x*t*u^3+D.x*t*u^3-3*B.x*u^2+3*C.x*u^2+2*A.x*t*u^2+B.x*t*u^2-2*C.x*t*u^2-D.x*t*u^2-A.x*t*u+C.x*t*u
y = B.y+2*B.y*u^3-2*C.y*u^3-A.y*t*u^3-B.y*t*u^3+C.y*t*u^3+D.y*t*u^3-3*B.y*u^2+3*C.y*u^2+2*A.y*t*u^2+B.y*t*u^2-2*C.y*t*u^2-D.y*t*u^2-A.y*t*u+C.y*t*u
z = B.z+2*B.z*u^3-2*C.z*u^3-A.z*t*u^3-B.z*t*u^3+C.z*t*u^3+D.z*t*u^3-3*B.z*u^2+3*C.z*u^2+2*A.z*t*u^2+B.z*t*u^2-2*C.z*t*u^2-D.z*t*u^2-A.z*t*u+C.z*t*u
*/

glm::vec3 interpolate(glm::vec3 A, glm::vec3 B, glm::vec3 C, glm::vec3 D, glm::float32 u) {
	glm::float32 t = 0.5f;
	return glm::vec3(
		B.x + 2 * B.x*pow(u, 3) - 2 * C.x*pow(u, 3) - A.x*t*pow(u, 3) - B.x*t*pow(u, 3) + C.x*t*pow(u, 3) + D.x*t*pow(u, 3) - 3 * B.x*pow(u, 2) + 3 * C.x*pow(u, 2) + 2 * A.x*t*pow(u, 2) + B.x*t*pow(u, 2) - 2 * C.x*t*pow(u, 2) - D.x*t*pow(u, 2) - A.x*t*u + C.x*t*u,
		B.y + 2 * B.y*pow(u, 3) - 2 * C.y*pow(u, 3) - A.y*t*pow(u, 3) - B.y*t*pow(u, 3) + C.y*t*pow(u, 3) + D.y*t*pow(u, 3) - 3 * B.y*pow(u, 2) + 3 * C.y*pow(u, 2) + 2 * A.y*t*pow(u, 2) + B.y*t*pow(u, 2) - 2 * C.y*t*pow(u, 2) - D.y*t*pow(u, 2) - A.y*t*u + C.y*t*u,
		B.z + 2 * B.z*pow(u, 3) - 2 * C.z*pow(u, 3) - A.z*t*pow(u, 3) - B.z*t*pow(u, 3) + C.z*t*pow(u, 3) + D.z*t*pow(u, 3) - 3 * B.z*pow(u, 2) + 3 * C.z*pow(u, 2) + 2 * A.z*t*pow(u, 2) + B.z*t*pow(u, 2) - 2 * C.z*t*pow(u, 2) - D.z*t*pow(u, 2) - A.z*t*u + C.z*t*u
		);
}