import math
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "signal-pole-model.glb"


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()


def mat(name, color, metallic=0.0, roughness=0.35, emission=None, strength=0.0):
    material = bpy.data.materials.new(name)
    material.use_nodes = True
    bsdf = material.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = color
        bsdf.inputs["Metallic"].default_value = metallic
        bsdf.inputs["Roughness"].default_value = roughness
        if emission:
            bsdf.inputs["Emission Color"].default_value = emission
            bsdf.inputs["Emission Strength"].default_value = strength
    return material


MAT_YELLOW = mat("signal yellow", (1.0, 0.93, 0.0, 1), 0.0, 0.22)
MAT_BLUE = mat("archive blue", (0.04, 0.15, 1.0, 1), 0.0, 0.28)
MAT_WHITE = mat("white sign", (0.92, 0.93, 0.96, 1), 0.0, 0.18)
MAT_BLACK = mat("gloss black", (0.005, 0.004, 0.004, 1), 0.15, 0.12)
MAT_DARK = mat("dark side rubber", (0.05, 0.038, 0.032, 1), 0.2, 0.18)
MAT_METAL = mat("brushed chrome", (0.82, 0.84, 0.86, 1), 1.0, 0.18)
MAT_POLE = mat("warm white pole", (0.86, 0.82, 0.78, 1), 0.2, 0.2)
MAT_MIRROR = mat("convex video mirror", (0.36, 0.46, 0.9, 1), 0.9, 0.08)
MAT_RED = mat("lamp red", (1, 0.05, 0.02, 1), 0.0, 0.08, (1, 0.05, 0.02, 1), 1.4)
MAT_AMBER = mat("lamp yellow", (1, 0.93, 0.02, 1), 0.0, 0.08, (1, 0.93, 0.02, 1), 1.1)
MAT_BLUE_LAMP = mat("lamp blue", (0.03, 0.16, 1, 1), 0.0, 0.08, (0.03, 0.16, 1, 1), 1.2)


def shade_smooth(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    try:
        bpy.ops.object.shade_smooth()
    except RuntimeError:
        pass
    obj.select_set(False)


def bevel(obj, amount, segments=4):
    mod = obj.modifiers.new("soft bevel", "BEVEL")
    mod.width = amount
    mod.segments = segments
    mod.affect = "EDGES"
    obj.modifiers.new("weighted highlights", "WEIGHTED_NORMAL")
    return obj


def cube(name, location, scale, material, rotation=(0, 0, 0), bevel_width=0.03):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(material)
    if bevel_width:
        bevel(obj, bevel_width, 7)
    return obj


def cylinder(name, location, radius, depth, material, vertices=64, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material)
    shade_smooth(obj)
    obj.modifiers.new("weighted highlights", "WEIGHTED_NORMAL")
    return obj


def add_text(name, text, location, size, material, rotation=(0, 0, 0), align="CENTER"):
    bpy.ops.object.text_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.body = text
    obj.data.align_x = align
    obj.data.align_y = "CENTER"
    obj.data.size = size
    obj.data.extrude = 0.006
    obj.data.resolution_u = 12
    obj.data.materials.append(material)
    return obj


def parent_empty(name, objects, rotation=(0, 0, 0), location=(0, 0, 0)):
    empty = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(empty)
    empty.location = location
    empty.rotation_euler = rotation
    for obj in objects:
        obj.parent = empty
    return empty


def sign(name, text, loc, rot, size, face_mat, text_mat, text_size=0.25):
    w, h, d = size
    face = cube(f"{name} face", (0, 0, 0), (w, d, h), face_mat, bevel_width=0.05)
    side = cube(f"{name} dark backing", (0, -0.07, -0.035), (w + 0.06, d + 0.09, h + 0.06), MAT_DARK, bevel_width=0.055)
    side.parent = face
    label = add_text(f"{name} text", text, (0, -0.135, 0.012), text_size, text_mat, rotation=(math.radians(90), 0, 0))
    label.parent = face
    for x in (-w / 2 + 0.18, w / 2 - 0.18):
        bolt = cylinder(f"{name} bolt", (x, -0.15, 0.0), 0.04, 0.025, MAT_METAL, vertices=32, rotation=(math.radians(90), 0, 0))
        bolt.parent = face
    face.location = loc
    face.rotation_euler = rot
    return face


def create_model():
    clear_scene()

    pole = cylinder("center pole", (0, 0, 0.3), 0.24, 6.8, MAT_POLE, vertices=96)
    pole.rotation_euler[0] = 0

    inner_pole = cylinder("thin front pole", (-0.62, -0.18, -1.05), 0.07, 3.2, MAT_METAL, vertices=48)

    yellow = sign(
        "creative developer sign",
        "CREATIVE DEVELOPER",
        (-0.22, -0.58, 2.75),
        (math.radians(12), math.radians(-8), math.radians(53)),
        (2.75, 0.12, 0.42),
        MAT_YELLOW,
        MAT_BLACK,
        0.24,
    )

    bottom = sign(
        "projects archive sign",
        "PROJECTS ARCHIVE",
        (-0.75, -0.72, -2.42),
        (math.radians(8), math.radians(-10), math.radians(-13)),
        (2.2, 0.1, 0.34),
        MAT_WHITE,
        MAT_BLACK,
        0.2,
    )

    contact = sign(
        "contact sign",
        "CONTACT",
        (1.0, -0.76, -1.25),
        (math.radians(5), math.radians(-42), math.radians(-8)),
        (1.0, 0.12, 1.72),
        MAT_DARK,
        mat("contact text white", (1, 1, 1, 1), 0, 0.4),
        0.22,
    )

    mirror_disc = cylinder("convex circular video mirror", (-1.0, -0.62, -0.72), 0.82, 0.1, MAT_MIRROR, vertices=128, rotation=(math.radians(90), 0, 0))
    mirror_disc.scale.x = 1.02
    bevel(mirror_disc, 0.015, 3)
    rim = cylinder("mirror chrome rim", (-1.0, -0.625, -0.72), 0.88, 0.08, MAT_METAL, vertices=128, rotation=(math.radians(90), 0, 0))
    rim.scale.x = 1.02
    rim.modifiers.new("rim bevel", "BEVEL").width = 0.02

    light_body = cube("yellow traffic light body", (0.92, -0.47, 0.42), (0.58, 0.38, 2.2), MAT_YELLOW, rotation=(0, math.radians(-8), 0), bevel_width=0.08)
    for i, (z, material, name) in enumerate([(1.18, MAT_RED, "red"), (0.42, MAT_AMBER, "yellow"), (-0.34, MAT_BLUE_LAMP, "blue")]):
        housing = cylinder(f"{name} black lamp hood", (0.62, -0.78, z), 0.28, 0.28, MAT_BLACK, vertices=72, rotation=(math.radians(90), 0, 0))
        lamp = cylinder(f"{name} glowing lamp", (0.62, -0.94, z), 0.205, 0.035, material, vertices=72, rotation=(math.radians(90), 0, 0))
        hood_side = cube(f"{name} hood visor", (0.62, -0.9, z + 0.18), (0.48, 0.18, 0.08), MAT_DARK, rotation=(0, 0, 0), bevel_width=0.04)
        housing.parent = light_body
        lamp.parent = light_body
        hood_side.parent = light_body

    for z in (2.05, 0.05, -1.15):
        band = cylinder("chrome strap", (0, -0.01, z), 0.27, 0.055, MAT_METAL, vertices=96, rotation=(math.radians(90), 0, 0))
        band.scale.x = 1.13
        band.scale.y = 1.13

    for z in (1.95, 0.2, -1.1):
        cylinder("support arm", (-0.44, -0.42, z), 0.035, 1.2, MAT_DARK, vertices=24, rotation=(0, math.radians(90), 0))

    cable = cylinder("black contact cable", (0.75, -0.64, -1.18), 0.035, 1.3, MAT_DARK, vertices=24, rotation=(math.radians(40), math.radians(0), math.radians(35)))
    cable.scale.z = 1

    main = parent_empty(
        "signal pole interactive model",
        [obj for obj in bpy.context.scene.objects if obj.type != "CAMERA" and obj.type != "LIGHT"],
        rotation=(math.radians(13), 0, math.radians(0)),
    )
    main.location = (0, 0, 0)

    bpy.ops.object.light_add(type="AREA", location=(0, -5, 4))
    key = bpy.context.object
    key.name = "large softbox"
    key.data.energy = 650
    key.data.size = 5

    bpy.ops.object.light_add(type="POINT", location=(-2.2, -2.2, 1.2))
    fill = bpy.context.object
    fill.name = "cool mirror fill"
    fill.data.energy = 90
    fill.data.color = (0.6, 0.72, 1.0)

    bpy.ops.object.camera_add(location=(0.2, -6.8, 1.8), rotation=(math.radians(76), 0, math.radians(2)))
    cam = bpy.context.object
    bpy.context.scene.camera = cam
    cam.data.lens = 42

    bpy.context.scene.render.engine = "CYCLES"
    bpy.context.scene.cycles.samples = 64
    bpy.context.scene.view_settings.view_transform = "Filmic"
    bpy.context.scene.view_settings.look = "Medium High Contrast"

    OUT.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=str(OUT),
        export_format="GLB",
        export_apply=True,
        export_texcoords=True,
        export_normals=True,
        export_materials="EXPORT",
    )


if __name__ == "__main__":
    create_model()
    print(f"Exported {OUT}")
