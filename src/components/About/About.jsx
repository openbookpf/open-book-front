import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import data from "./aboutData";
const About = () => {
    return (
        <div className="relative">
            <div
                className="absolute inset-0 bg-cover bg-center w-full h-full"
                style={{
                    backgroundImage: `url(https://img.freepik.com/foto-gratis/abundante-coleccion-libros-antiguos-estantes-madera-generados-ia_188544-29660.jpg)`,
                    opacity: 0.9,
                }}
            ></div>
            <div className="relative my-24 h-100 flex justify-center items-center">
                <div className="w-3/4 mv:w-4/5 sm:w-3/4 rounded-xl p-12 bg-blue-0">
                    <div className="flex flex-col items-center text-white-0 rounded-lg p-4 md:mx-auto mb-8 max-w-lg text-center mt-0">
                        <h2 className="text-4xl text-center w-full font-bold text-white-0">
                            Meet the team behind <span className="text-orange-0">OpenBook</span>
                        </h2>
                        <h3 className="text-lg mt-2 font-semibold text-white-0">We had a goal:</h3>
                        <p className="text-sm text-white-0">
                            build a bookstore that fills users with joy as they delve into its contents, just like a
                            real-life library experience.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center">
                        {data.map((user, index) => (
                            <div className="m-4" key={index}>
                                <div className="w-80 m-4 mv:w-72 sm:w-80 bg-white-0 justify-start flex flex-row mv:flex-col sm:flex-row rounded-lg mx-auto px-14 py-2 h-full">
                                    <img
                                        src={user.img}
                                        alt={user.name}
                                        className="rounded-full w-24 my-auto align-middle mr-2 h-24"
                                    />
                                    <div className="flex flex-col my-auto">
                                        <h4 className="text-lg font-bold text-wrap">{user.name}</h4>
                                        <div className="flex justify-start mt-2">
                                            <a
                                                href={user.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mr-2"
                                            >
                                                <FaGithub className="text-gray-800 text-2xl hover:scale-110 delay-100 transition ease-in" />
                                            </a>
                                            <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                                                <FaLinkedin className="text-blue-600 text-2xl hover:scale-110 delay-100 transition ease-in" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
